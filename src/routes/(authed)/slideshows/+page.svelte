<script>
    // Export form
    let { data, form } = $props(); // Is automatically populated by SvelteKit

    import Slideshow from "$lib/components/slideshow/slideshow.svelte";
    import Header from "$lib/components/slideshow/slideshowHeader.svelte";
    import { getCookie } from "$lib/utils/getcookie.js";
    import { onMount } from "svelte";
    import { env } from "$env/dynamic/public";

    let slideshowContent = $state(data.slideshow);
    let VMIForSS = $state(null);
    let visualMedias = $state(data.visualMedia);

    let status = $state([]);
    onMount(async () => {
        const statusData = await fetch(env.PUBLIC_API_URL + "/api/slideshows/states", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getCookie("authToken"),
            }
        });
        status = await statusData.json();
    });

    let forceComponentUpdate = $state(true);
    function updateSlideshowContent(data, closeSS = false) {
        slideshowContent = data;
        if (closeSS == true){
            forceComponentUpdate = !forceComponentUpdate;
        }

        if (selectedId != null) {
            let newVMI = slideshowContent
                .find((ss) => ss.id === selectedId)
                .visualMediaInclusionCollection.sort(
                    (a, b) => a.slideshowPosition - b.slideshowPosition,
                );
            VMIForSS = newVMI;
        }
    }

    let searchSlideshow = $state("");
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

    let searchTerm = $state(""); // For live text search
    let searchTags = $state(""); // For tag-based filtering
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

    var selectedId = $state(null);
    var isChecked = $state(false);
    var focusedSlideshow = $state(null);
    var archivedState = $state(false);

    function updateState(id) {
        selectedId = id == selectedId ? null : id;
        VMIForSS = slideshowContent.find((ss) => ss.id === selectedId)
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
        // const slideshowToUpdate = slideshowContent.find(
        //     (slideshow) =>
        //         slideshowContent.id === updatedItems[0]?.parentSlideshowId,
        // );

        // if (slideshowToUpdate) {
        //     // Update the visualMediaInclusionCollection with the reordered items
        //     slideshowToUpdate.visualMediaInclusionCollection = updatedItems;
        // }
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
        {#key forceComponentUpdate}
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
                        status={status}
                    />
                {/if}
            {/each}
        {/key}
    </div>
</div>

<style>
    @import "$lib/styles/slideshow.css";
    @import "$lib/styles/addMedia.css";
</style>
