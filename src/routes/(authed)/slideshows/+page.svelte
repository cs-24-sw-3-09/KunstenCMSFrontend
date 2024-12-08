<script>
    // Export form
    let { data, form } = $props(); // Is automatically populated by SvelteKit

    import Slideshow from "$lib/components/slideshow/slideshow.svelte";
    import Header from "$lib/components/slideshow/slideshowHeader.svelte";

    let slideshowContent = $state(data.slideshow);
    let VMIForSS = $state(null);
    let visualMedias = $state(data.visualMedia);

    var selectedId = $state(null);
    var isChecked = $state(false);
    var focusedSlideshow = $state(null);
    var archivedState = $state(false);

    let searchSlideshow = $state("");

    let searchTerm = $state(""); // For live text search
    let searchTags = $state(""); // For tag-based filtering
    

    let color = data.color;
    function updateSlideshowContent(data) {
        slideshowContent = data;
        updateState(selectedId);
        /*if (selectedId != null) {
            console.log("here")
            VMIForSS = data
            .find((ss) => ss.id === selectedId)
            ?.visualMediaInclusionCollection?.sort(
                (a, b) => a.slideshowPosition - b.slideshowPosition,
            );
        }
        console.log(VMIForSS)*/
    }

    function filterSlideshow(slideshows, searchTerm) {
        if (searchTerm) {
            // Filter by name
            slideshows = slideshows.filter((slideshow) =>
                slideshow.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }
        return slideshows;
    }
    let filteredslideshow = $derived.by(() => {
        return filterSlideshow(slideshowContent, searchSlideshow);
    }); // Reactive var
    function searchSlideshowUpdate(event) {
        searchSlideshow = event.target.value;
    }


    function filterVisualMedia(visualMedias, searchVMTerm, searchVMTags) {
        if (searchVMTerm) {
            // Filter by name
            visualMedias = visualMedias?.filter((VM) =>
                VM.name?.toLowerCase().includes(searchVMTerm?.toLowerCase()),
            );
        }
        if (searchVMTags && searchVMTags.length > 0) {
            // Filter by tags, if any/some part of the tag is included in the search
            visualMedias = visualMedias.filter((VM) =>
                VM.tags?.some((tag) =>
                    tag.text.toLowerCase().includes(searchVMTags.toLowerCase()),
                ),
            );
        }
        return visualMedias;
    }

    let filteredVisualMedia = $derived.by(() => {
        return filterVisualMedia(visualMedias, searchTerm, searchTags);
    }); // Reactive var

    function searchTermUpdate(event) {
        searchTerm = event.target.value;
    }

    function searchTagsUpdate(event) {
        searchTags = event.target.value;
    }

    function updateState(id) {
        selectedId = id == selectedId ? null : id;
        VMIForSS = slideshowContent
            .find((ss) => ss.id === selectedId)
            ?.visualMediaInclusionCollection?.sort(
                (a, b) => a.slideshowPosition - b.slideshowPosition,
            );
    }
    function updateChecked() {
        isChecked = !isChecked;
    }
    function focusSlideshow(id) {
        focusedSlideshow = id == focusedSlideshow ? null : id;
    }

    function handleOrderUpdate(updatedItems) {
        // Find the relevant slideshow
        const slideshowToUpdate = slideshowContent.find(
            (slideshow) =>
                slideshowContent.id === updatedItems[0]?.parentSlideshowId,
        );

        if (slideshowToUpdate) {
            // Update the visualMediaInclusionCollection with the reordered items
            slideshowToUpdate.visualMediaInclusionCollection = updatedItems;
        }
    }
</script>

<div class="main-content">
    <Header
        on:update={(event) => updateChecked(event.detail)}
        {searchSlideshow}
        {searchSlideshowUpdate}
        {updateSlideshowContent}
    />
    <div class="slideshows-list">
        {#each filteredslideshow as slideshow}
            {#if (!focusedSlideshow && slideshow.isArchived === isChecked) || (focusedSlideshow && slideshow.id === focusedSlideshow)}
                <Slideshow
                    {slideshow}
                    {VMIForSS}
                    {filteredVisualMedia}
                    on:update={(event) => updateState(event.detail)}
                    on:focus={(event) => focusSlideshow(event.detail)}
                    on:updateOrder={(event) => handleOrderUpdate(event.detail)}
                    {selectedId}
                    {searchTags}
                    {searchTerm}
                    {archivedState}
                    {focusedSlideshow}
                    {searchTagsUpdate}
                    {searchTermUpdate}
                    {updateSlideshowContent}
                    {form}
                    color={color.find((row) => row.slideshowId == slideshow.id)
                        ?.color}
                    screens={color.find(
                        (row) => row.slideshowId == slideshow.id,
                    )?.displayDevices}
                />
            {/if}
        {/each}
    </div>
</div>

<style>
    @import "$lib/styles/slideshow.css";
    @import "$lib/styles/addMedia.css";
</style>
