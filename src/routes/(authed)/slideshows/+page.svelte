<script>
    const API_URL = import.meta.env.VITE_API_URL;
    // Export form
    let { data, form } = $props(); // Is automatically populated by SvelteKit

    import Slideshow from "$lib/components/slideshow/slideshow.svelte";
    import Header from "$lib/components/slideshow/slideshowHeader.svelte";

    let slideshowContent = $state(data.slideshow);
    let visualMediaContent = $state(data.visualMedia);
    function updateSlideshowContent(data) {
        slideshowContent = data;
    }

    let searchTerm = $state(""); // For live text search
    let searchSlideshow = $state("");
    let searchTags = $state(""); // For tag-based filtering

    function filterItems(items, searchTerm, searchTags) {
        if (searchTerm) {
            // Filter by name
            items = items.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }
        if (searchTags && searchTags.length > 0) {
            // Filter by tags, if any/some part of the tag is included in the search
            items = items.filter((item) =>
                item.tags.some((tag) =>
                    tag.text.toLowerCase().includes(searchTags.toLowerCase()),
                ),
            );
        }
        return items;
    }

    


    let filteredData = $derived.by(() => {
        return filterItems(visualMediaContent.content, searchTerm, searchTags);
    }); // Reactive var

    let filteredslideshow = $derived.by(() => {
        return filterItems(slideshowContent, searchSlideshow, searchTags);
    }); // Reactive var

    function searchTermUpdate(event) {
        searchTerm = event.target.value;
    }

    function searchTagsUpdate(event) {
        searchTags = event.target.value;
    }

    var selectedId = $state(null);
    var isChecked = $state(false);
    var focusedSlideshow = $state(null);
    var archivedState = $state(false);

    function updateState(id) {
        selectedId = id == selectedId ? null : id;
    }
    function updateChecked() {
        isChecked = !isChecked;
        console.log(isChecked);
    }
    function focusSlideshow(id) {
        focusedSlideshow = id == focusedSlideshow ? null : id;
        console.log(focusedSlideshow);
    }

    function handleOrderUpdate(updatedItems) {
        // Find the relevant slideshow
        const slideshowToUpdate = slideshows.find(
            (slideshow) => slideshow.id === updatedItems[0]?.parentSlideshowId,
        );

        if (slideshowToUpdate) {
            // Update the visualMediaInclusionCollection with the reordered items
            slideshowToUpdate.visualMediaInclusionCollection = updatedItems;

            // Optional: Log the updated slideshow for debugging
            console.log("Updated slideshow:", slideshowToUpdate);
        }
    }

    function flipArchived (state){
        archivedState = !state;
    }

</script>

<div class="main-content">
    <Header
        on:update={(event) => updateChecked(event.detail)}
        {searchSlideshow}
        {searchTermUpdate}
        updateSlideshowContent={updateSlideshowContent}
    />

    {#each filteredslideshow as slideshow}
        {#if (!focusedSlideshow && slideshow.isArchived === isChecked) || (focusedSlideshow && slideshow.id === focusedSlideshow)}
            <Slideshow
                {slideshow}
                {filteredData}
                on:update={(event) => updateState(event.detail)}
                on:focus={(event) => focusSlideshow(event.detail)}
                on:updateOrder={(event) => handleOrderUpdate(event.detail)}
                on:archived={(event) => flipArchived(event.detail)}
                {selectedId}
                {searchTags}
                {searchTerm}
                {archivedState}
                {searchTagsUpdate}
                {searchTermUpdate}
                updateSlideshowContent = {updateSlideshowContent}
            />
        {/if}
    {/each}
</div>

<style>
    @import "$lib/styles/slideshow.css";
    @import "$lib/styles/addMedia.css";
</style>
