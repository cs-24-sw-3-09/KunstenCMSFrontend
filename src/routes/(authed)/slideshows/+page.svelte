<script>
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
                    ],
                },
                {
                    id: 2,
                    name: "Second slideshow",
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

    var selectedId = null;

    function updateState(id) {
        selectedId = (id == selectedId ? null : id);
    }
</script>

<div class="main-content">
    <Header />

    {#each slideshows as slideshow}
        {#each slideshow.content as screen}
            <Slideshow
                {screen}
                {testVisualMedia}
                on:update={(event) => updateState(event.detail)}
                {selectedId}
            />
        {/each}
    {/each}
</div>

<style>
    @import "$lib/styles/slideshow.css";
    @import "$lib/styles/addMedia.css";
</style>
