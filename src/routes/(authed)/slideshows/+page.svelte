<script>

    import Slideshow from "$lib/components/slideshow.svelte";
    import Header from "$lib/components/slideshowHeader.svelte";
    let slideshows = [{
    "content": [
        {
            "id": 6,
            "name": "My Slideshow",
            "isArchived": false,
            "visualMediaInclusionCollection": [
                {
                    "id": 5,
                    "slideDuration": 5,
                    "slideshowPosition": 1,
                    "visualMedia": {
                        "type": "visualMedia",
                        "id": 12,
                        "name": "Sample Media",
                        "location": "/visual_media/1.jpg",
                        "fileType": "image/jpeg",
                        "description": "A sample media file for testing.",
                        "lastDateModified": "2024-11-20"
                    }
                }, 
                {
                    "id": 6,
                    "slideDuration": 5,
                    "slideshowPosition": 1,
                    "visualMedia": {
                        "type": "visualMedia",
                        "id": 12,
                        "name": "Sample Media",
                        "location": "/visual_media/1.jpg",
                        "fileType": "image/jpeg",
                        "description": "A sample media file for testing.",
                        "lastDateModified": "2024-11-20"
                    }
                }
            ]
        },
    ],
    "pageable": {
        "pageNumber": 0,
        "pageSize": 20,
        "sort": {
            "unsorted": true,
            "empty": true,
            "sorted": false
        },
        "offset": 0,
        "unpaged": false,
        "paged": true
    },
    "last": true,
    "totalElements": 1,
    "totalPages": 1,
    "first": true,
    "numberOfElements": 1,
    "size": 20,
    "number": 0,
    "sort": {
        "unsorted": true,
        "empty": true,
        "sorted": false
    },
    "empty": false
},
]


</script>

<div class="main-content">

    <Header/>

    {#each slideshows as slideshow}
        {#each slideshow.content as screen}
        <Slideshow {screen}/>
        {/each}
        
    {/each}





</div>



<style>
        @import "$lib/styles/slideshow.css";
</style>