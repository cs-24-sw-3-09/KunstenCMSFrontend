<script>
    let {
        doClose,
        Item,
        searchTerm,
        searchTags,
        searchTermUpdate,
        searchTagsUpdate,
        slideshowID,
        VMIForSS,
        updateSlideshowContent,
    } = $props();

    // Import the "enhance" function from the "form" module.
    import { enhance } from "$app/forms";

    function closeModal() {
        doClose();
    }

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import MediaItem from "$lib/components/modal/mediaItem.svelte";
    import Checkbox from "$lib/components/modal/checkbox.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import Smallheader from "$lib/components/modal/smallheader.svelte";



    var selectedId = $state(null);
    let selectedItem = $state({});

    function updateState(id) {
        selectedId = id == selectedId ? id : id;
        //console.log(selectedId);
    }

    function preventEnterSubmit(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    }
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="add-media-modal active">
    <div class="add-media-modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Add new media" />

        <form
            method="post"
            action="?/newMediaToSlideshow"
            use:enhance={({ formData }) => {
                formData.set("id", selectedItem.id);
                formData.set("name", selectedItem.name);
                formData.set("location", selectedItem.location);
                formData.set("fileType", selectedItem.fileType);
                formData.set("description", selectedItem.description);
                formData.set("ssId", slideshowID);
                formData.set("ssPos", VMIForSS.length + 1);

                return async ({ result }) => {
                    // `result` is an `ActionResult` object
                    if (result.type === "failure") {
                        // Handle the error
                        alert(
                            `Failed to add new visual media to slideshow.\n${result.data?.error}`,
                        );
                    } else if (result.type === "success") {
                        closeModal(); // Call doClose on successful form submission
                        updateSlideshowContent(result.data.newData);
                    }
                };
            }}
        >
            <div class="add-media-modal-search">
                <input
                    type="text"
                    placeholder="Search for visual media"
                    value={searchTerm}
                    oninput={searchTermUpdate}
                    onkeydown={preventEnterSubmit}
                />
                <input
                    type="text"
                    placeholder="Search for tags"
                    value={searchTags}
                    oninput={searchTagsUpdate}
                    onkeydown={preventEnterSubmit}
                />
            </div>
            <Smallheader text={"Force changes:"} />
            <Checkbox
                name={"Force"}
                checked={false}
            />

            <div class="add-media-modal-list">
                {#each Item as item}
                    <MediaItem
                        {item}
                        {selectedId}
                        on:update={(event) => {
                            selectedItem = item;
                            updateState(event.detail);
                        }}
                    />
                {/each}
            </div>

            <div class="modal-buttons">
                <Button
                    type="button"
                    text="Cancel"
                    doFunc={doClose}
                    extra_class={"modal-button-close"}
                />
                <Button
                    type="submit"
                    text="Submit"
                    extra_class={"modal-button-submit"}
                />
            </div>
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
