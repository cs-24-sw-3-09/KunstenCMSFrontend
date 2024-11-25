<script>
    import Gallery from "$lib/components/gallery/gallery.svelte";

    let items = [
        {
            name: "test",
            description: "test",
            tags: ["test", "test2", "test4"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-01-01"
        },
        {
            name: "test",
            description: "test",
            tags: ["test", "test3", "test4"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-01-01"
        },
        {
            name: "test2",
            description: "asdasdasd",
            tags: ["test", "test3", "test5"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-01-01"
        },
    ];

</script>

<div class="main-content">
    <div class="page">
        <!-- <div class="page-header">
            <h1>Gallery</h1>
        </div> -->
        <Gallery items={items} />
    </div>
</div>

<style>
    @import "$lib/styles/gallery.css";
</style>
