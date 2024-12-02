<script>
    const API_URL = import.meta.env.VITE_API_URL;
    // Export form
    let { data, form } = $props(); // Is automatically populated by SvelteKit

    import Slideshow from "$lib/components/slideshow/slideshow.svelte";
    import Header from "$lib/components/slideshow/slideshowHeader.svelte";

    //console.table(data);
    //let allContent = slideshows.flatMap((slideshow) => slideshow.content);
    let allContent = $state(data.slideshow);
    //console.log(allContent);

    function updateAllContent(data) {
        allContent = data;
    }

    let searchTerm = $state(""); // For live text search
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
        return filterItems(data, searchTerm, searchTags);
    }); // Reactive var

    let filteredslideshow = $derived.by(() => {
        return filterItems(allContent, searchTerm, searchTags);
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
</script>

<div class="main-content">
    <Header
        on:update={(event) => updateChecked(event.detail)}
        {searchTerm}
        {searchTermUpdate}
        {updateAllContent}
    />

    {#each filteredslideshow as slideshow}
        {#if (!focusedSlideshow && slideshow.isArchived === isChecked) || (focusedSlideshow && slideshow.id === focusedSlideshow)}
            <Slideshow
                {slideshow}
                {filteredData}
                on:update={(event) => updateState(event.detail)}
                on:focus={(event) => focusSlideshow(event.detail)}
                on:updateOrder={(event) => handleOrderUpdate(event.detail)}
                {selectedId}
                {searchTags}
                {searchTerm}
                {searchTagsUpdate}
                {searchTermUpdate}
            />
        {/if}
    {/each}
</div>

<style>
    @import "$lib/styles/slideshow.css";
    @import "$lib/styles/addMedia.css";
</style>
