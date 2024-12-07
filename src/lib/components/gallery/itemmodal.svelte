<script>
    let { item, doClose, updateTags, delTag } = $props();
    import { enhance } from "$app/forms";

    import { env } from '$env/dynamic/public';
    import { onMount } from "svelte";
    import { getCookie } from "$lib/utils/getcookie.js";

    let slideshows = $state();

   onMount(async() => {
    slideshows = fetch(env.PUBLIC_API_URL + "/api/visual_medias/" + item.id + "/slideshows", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + getCookie("authToken"),
        }
    }).then(data => data.json());
   })
</script>

<div class="gallery-modal">
    <div class="gallery-modal-content">
        <div class="gallery-modal-img-container">
            <img
                src={env.PUBLIC_API_URL + item.location}
                alt="Gallery Image"
                class="gallery-modal-image"
            />
        </div>
        <div class="gallery-modal-close" onclick={doClose}>
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </div>
        <div class="gallery-modal-info">
            <div class="gallery-modal-content-left">
                <div class="gallery-modal-title">{item.name}</div>
                <div class="gallery-modal-description">{item.description}</div>
            </div>
            <div class="gallery-modal-content-mid">
                <div>
                    <div class="gallery-content-mid-title">
                        Included in the Slideshows:
                    </div>
                    <div class="gallery-content-mid-list">
                        {#await slideshows}
                            Loading...
                        {:then slideshows} 
                            {#each slideshows as slideshow}
                                <div class="gallery-content-mid-list">
                                    {slideshow.name}
                                </div>
                            {/each}
                        {/await}
                        
                    </div>
                </div>
            </div>
            <div class="gallery-modal-content-right">
                <div>
                    <div class="gallery-content-right-title">Media Tags:</div>
                    <div class="gallery-modal-tags">
                        {#each item.tags as tag}
                            <form method="post" action="?/deleteTagFromVisualMedia"
                            use:enhance={({ formData }) => {
                                // `formData` is its `FormData` object that's about to be submitted
                                formData.set("id", item.id);
                                formData.set("tagid", tag.id);

                                return async ({ result }) => {
                                    switch (result.type) {
                                        case "failure":
                                            alert(`Failed to delete tag for visual media, please reload page (F5).\n${result.data?.error}`);
                                            break;
                                        case "success":
                                            delTag(item.id, result.data.tagId);
                                            break;
                                    }
                                }
                            }}>
                                <div class="gallery-modal-tag">
                                    {tag.text}
                                    <!-- Hacky way to make trashcan icon pressable and submit the form -->
                                    <button type="submit" aria-label="Delete tag" style="all: unset;">
                                        <i class="fa-solid fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </form>
                        {/each}

                        <form method="post" action="?/addTagToVisualMedia"
                        use:enhance={({ formData }) => {
                            // `formData` is its `FormData` object that's about to be submitted
                            formData.set("id", item.id);
                            return async ({ result }) => {
                                switch (result.type) {
                                    case "failure":
                                        alert(`Failed to add tag to visual media, please reload page (F5).\n${result.data?.error}`);
                                        break;
                                    case "success":
                                        updateTags(result.data.responseData);
                                        break;
                                }
                            };
                        }}>
                            <div class="gallery-add-tag-button">
                                <!-- TODO: make lige in prototype -->
                                <!-- <p>Add tag</p> -->
                                <!-- <input placeholder="Enter Tag" hidden="" /> -->
                                <input type="text" placeholder="Enter New Tag" name="tag" />
                                <button type="submit" aria-label="Add tag" style="all: unset;">
                                    <i class="fa-solid fa-plus" aria-hidden="true" ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
