<script>
    // Export form
    let { form } = $props(); // Is automatically populated by SvelteKit

    import Slideshow from "$lib/components/slideshow.svelte";
    import Header from "$lib/components/slideshowHeader.svelte";

    import { testVisualMedia } from "$lib/testdata.js";

    let slideshows = [
        {
            content: [
                {
                    id: 1,
                    name: "My Slideshow",
                    isArchived: false,
                    visualMediaInclusionCollection: [
                        {
                            id: 5,
                            slideDuration: 5,
                            slideshowPosition: 1,
                            visualMedia: {
                                type: "visualMedia",
                                id: 12,
                                name: "Sample Media",
                                location: "/visual_media/1.jpg",
                                fileType: "image/jpeg",
                                description: "A sample media file for testing.",
                                lastDateModified: "2024-11-20",
                            },
                        },
                        {
                            id: 6,
                            slideDuration: 5,
                            slideshowPosition: 2,
                            visualMedia: {
                                type: "visualMedia",
                                id: 12,
                                name: "Sample Media",
                                location: "/visual_media/1.jpg",
                                fileType: "image/jpeg",
                                description: "A sample media file for testing.",
                                lastDateModified: "2024-11-20",
                            },
                        },
                    ],
                },
                {
                    id: 2,
                    name: "Second slideshow",
                    isArchived: false,
                    visualMediaInclusionCollection: [
                        {
                            id: 1,
                            slideDuration: 5,
                            slideshowPosition: 1,
                            visualMedia: {
                                type: "visualMedia",
                                id: 12,
                                name: "Sample Media",
                                location: "/visual_media/1.jpg",
                                fileType: "image/jpeg",
                                description: "A sample media file for testing.",
                                lastDateModified: "2024-11-20",
                            },
                        },
                        {
                            id: 2,
                            slideDuration: 5,
                            slideshowPosition: 2,
                            visualMedia: {
                                type: "visualMedia",
                                id: 12,
                                name: "Sample Media",
                                location: "/visual_media/1.jpg",
                                fileType: "image/jpeg",
                                description: "A sample media file for testing.",
                                lastDateModified: "2024-11-20",
                            },
                        },
                        {
                            id: 3,
                            slideDuration: 5,
                            slideshowPosition: 3,
                            visualMedia: {
                                type: "visualMedia",
                                id: 12,
                                name: "Sample Media",
                                location: "/visual_media/1.jpg",
                                fileType: "image/jpeg",
                                description: "A sample media file for testing.",
                                lastDateModified: "2024-11-20",
                            },
                        },
                        {
                            id: 4,
                            slideDuration: 5,
                            slideshowPosition: 4,
                            visualMedia: {
                                type: "visualMedia",
                                id: 12,
                                name: "Sample Media",
                                location: "/visual_media/1.jpg",
                                fileType: "image/jpeg",
                                description: "A sample media file for testing.",
                                lastDateModified: "2024-11-20",
                            },
                        },
                    ],
                },
            ],
            pageable: {
                pageNumber: 0,
                pageSize: 20,
                sort: {
                    unsorted: true,
                    empty: true,
                    sorted: false,
                },
                offset: 0,
                unpaged: false,
                paged: true,
            },
            last: true,
            totalElements: 1,
            totalPages: 1,
            first: true,
            numberOfElements: 1,
            size: 20,
            number: 0,
            sort: {
                unsorted: true,
                empty: true,
                sorted: false,
            },
            empty: false,
        },
    ];

    let data = $state(testVisualMedia);
    let Slideshows = $state(slideshows);
    console.log(Slideshows);



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
        return filterItems(Slideshows.content, searchTerm, searchTags);
    }); // Reactive var
    console.log(filteredslideshow);

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
</script>

<div class="main-content">
    <Header
        on:update={(event) => updateChecked(event.detail)}
        {searchTerm}
        {searchTermUpdate}
    />

    {#each slideshows as slideshowsid}
        {#each slideshowsid.content as slideshow}
            {#if (!focusedSlideshow && slideshow.isArchived === isChecked) || (focusedSlideshow && slideshow.id === focusedSlideshow)}
                <Slideshow
                    {slideshow}
                    {filteredData}
                    on:update={(event) => updateState(event.detail)}
                    on:focus={(event) => focusSlideshow(event.detail)}
                    {selectedId}
                    {searchTags}
                    {searchTerm}
                    {searchTagsUpdate}
                    {searchTermUpdate}
                />
            {/if}
        {/each}
    {/each}
</div>

<style>
    @import "$lib/styles/slideshow.css";
    @import "$lib/styles/addMedia.css";
</style>
