<script>
    let { item, doClose } = $props();
    import { enhance } from "$app/forms";
</script>

<div class="gallery-modal">
    <div class="gallery-modal-content">
        <div class="gallery-modal-img-container">
            <img
                src={item.location}
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
                        {#each item.slideshows as slideshow}
                            <div class="gallery-content-mid-list">
                                {slideshow}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="gallery-modal-content-right">
                <div>
                    <div class="gallery-content-right-title">Media Tags:</div>
                    <div class="gallery-modal-tags">
                        {#each item.tags as tag}
                            <form
                                method="post"
                                action="?/deleteTagFromVisualMedia"
                                use:enhance={({ formData }) => {
                                    // `formData` is its `FormData` object that's about to be submitted
                                    formData.set("id", item.id);
                                    formData.set("tag", tag);

                                    return async ({ result }) => {
                                        // `result` is an `ActionResult` object
                                        if (result.type === "failure") {
                                            // Handle the error
                                            alert(
                                                `Failed to delete tag for visual media, please reload page (F5).\n${result.data?.error}`,
                                            );
                                        }
                                    };
                                }}
                            >
                                <div class="gallery-modal-tag">
                                    {tag.text}
                                    <!-- Hacky way to make trashcan icon pressable and submit the form -->
                                    <button
                                        type="submit"
                                        aria-label="Delete tag"
                                        style="all: unset;"
                                    >
                                        <i
                                            class="fa-solid fa-trash"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </div>
                            </form>
                        {/each}

                        <form
                            method="post"
                            action="?/addTagToVisualMedia"
                            use:enhance={({ formData }) => {
                                // `formData` is its `FormData` object that's about to be submitted
                                formData.set("id", item.id);

                                return async ({ result }) => {
                                    // `result` is an `ActionResult` object
                                    if (result.type === "failure") {
                                        // Handle the error
                                        alert(
                                            `Failed to add tag to visual media, please reload page (F5).\n${result.data?.error}`,
                                        );
                                    }
                                };
                            }}
                        >
                            <div class="gallery-add-tag-button">
                                <!-- TODO: make lige in prototype -->
                                <!-- <p>Add tag</p> -->
                                <!-- <input placeholder="Enter Tag" hidden="" /> -->
                                <input
                                    type="text"
                                    placeholder="Enter New Tag"
                                    name="tag"
                                />
                                <button
                                    type="submit"
                                    aria-label="Add tag"
                                    style="all: unset;"
                                >
                                    <i
                                        class="fa-solid fa-plus"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
