<script>
    import Gallery from "$lib/components/gallery/gallery.svelte";
    import ItemModal from "$lib/components/gallery/itemmodal.svelte";
    import NewModal from "$lib/components/gallery/newmodal.svelte";
    import EditModal from "$lib/components/gallery/editmodal.svelte";
    
    // mock data
    let data = $state([
        {
            name: "Sunset Symphony",
            description: "A captivating painting capturing the beauty of a sunset over the ocean.",
            tags: ["art", "painting", "seascape"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-05-15",
            slideshows: ["Gallery Opening 2024", "Seascapes 2023", "Art Fair 2022"],
        },
        {
            name: "Eternal Form",
            description: "A modern sculpture showcasing the flow and continuity of life.",
            tags: ["art", "sculpture", "modern"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2022-11-10",
            slideshows: ["Sculpture Expo 2024", "Modern Art Week 2023"],
        },
        {
            name: "Captured Horizon",
            description: "A serene photograph of rolling hills meeting the sky at dawn.",
            tags: ["art", "photography", "landscape"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-03-22",
            slideshows: ["Photography Contest 2024", "Landscape Series 2023"],
        },
        {
            name: "Still Life, Vibrant Life",
            description: "An intricate drawing depicting vibrant fruits in a hyperrealistic style.",
            tags: ["art", "drawing", "realism"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-07-08",
            slideshows: ["Realism Showcase 2024", "Still Life Expo 2023"],
        },
        {
            name: "Abstract Perception",
            description: "An installation challenging perceptions of space and color.",
            tags: ["art", "installation", "conceptual"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-09-30",
            slideshows: ["Conceptual Art 2024", "Avant-Garde 2023"],
        },
        {
            name: "Echoes of Time",
            description: "A painting exploring the interplay between history and memory.",
            tags: ["art", "painting", "abstract"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-02-18",
            slideshows: ["Abstract Horizons 2024", "Art Retrospective 2023"],
        },
        {
            name: "Light and Shadow",
            description: "A black-and-white photograph emphasizing dramatic contrasts.",
            tags: ["art", "photography", "monochrome"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2022-12-01",
            slideshows: ["Monochrome Marvels 2024", "Art of Contrast 2023"],
        },
        {
            name: "Kinetic Whirl",
            description: "An installation featuring motion and dynamic light patterns.",
            tags: ["art", "installation", "kinetic"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-06-20",
            slideshows: ["Interactive Art 2024", "Kinetic Forms 2023"],
        },
        {
            name: "Urban Canvas",
            description: "A mural depicting the vibrant culture of a bustling city.",
            tags: ["art", "mural", "urban"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-08-12",
            slideshows: ["Street Art 2024", "Urban Chronicles 2023"],
        },
        {
            name: "Reflections of the Mind",
            description: "A conceptual painting exploring the layers of human thought.",
            tags: ["art", "painting", "conceptual"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-04-25",
            slideshows: ["Thoughtscapes 2024", "Abstract Ideas 2023"],
        }
    ]);


    let showItemModal = $state(false);
    let showNewModal = $state(false);
    let showEditModal = $state(false);
    
    let focusItem = $state({});

    let searchTerm = $state(""); // For live text search
    let searchTags = $state([]); // For tag-based filtering
    
    function filterItems(items, searchTerm, searchTags) {
        if (searchTerm) {
            items = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (searchTags && searchTags.length > 0) {
            items = items.filter((item) => item.tags.some((tag) => searchTags.includes(tag)));
        }
        return items;
    }
    
    let filteredData = $derived.by(() => {
        return filterItems(data, searchTerm, searchTags);
    }); // Reactive var

    function searchTermUpdate(event) {
        searchTerm = event.target.value;
    }

    function searchTagsUpdate(event) {
        searchTags = event.target.value;
    }

    function doToggleItemModal(item=focusItem) {
        focusItem = item;
        showEditModal = false;
        showNewModal = false;
        showItemModal = !showItemModal;
        //console.log("showItemModal: ", showItemModal);
    }

    function doToggleNewModal() {
        focusItem = {};
        showEditModal = false;
        showItemModal = false;
        showNewModal = !showNewModal;
        //console.log("showNewModal: ", showNewModal);
    }

    function doToggleEditModal(item) {
        focusItem = item;
        showItemModal = false;
        showNewModal = false;
        showEditModal = !showEditModal;
        //console.log("showEditModal: ", showEditModal);
    }

    function doDelete(item) {
        let confirmation = alert("Delete item: " + item.name);
        if (confirmation) {
            console.log("delete:", item);
        }
    }

    function doSubmitNew(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        console.log("New item submitted:");
        console.log(data);

    }

    function doSubmitEdit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        

        console.log("Edit item submitted:");
        console.log(data);
    }

    function doSubmitTag(item, tag) {
        console.log("Tag submitted to item:");
        console.log(tag, item);
    }

    function doDeleteTag(item, tag) {
        console.log("Tag deleted from item:");
        console.log(tag, item);
    }
</script>

<div class="main-content">
    <div class="page">
        <Gallery
            items={filteredData}
            doToggleNewModal={doToggleNewModal}
            doToggleEditModal={doToggleEditModal}
            doDelete={doDelete}
            doToggleItemModal={doToggleItemModal}
            searchTermUpdate={searchTermUpdate}
            searchTerm={searchTerm}
            searchTagsUpdate={searchTagsUpdate}
            searchTags={searchTags}
        />
    </div>
</div>

{#if showItemModal}
    <ItemModal item={focusItem} doClose={doToggleItemModal} onTagSubmit={doSubmitTag} onTagDelete={doDeleteTag} />
{/if}
{#if showNewModal}
    <NewModal doClose={doToggleNewModal} doSubmit={doSubmitNew} />
{/if}
{#if showEditModal}
    <EditModal item={focusItem} doClose={doToggleEditModal} doSubmit={doSubmitEdit} />
{/if}


<style>
    @import "$lib/styles/gallery.css";
</style>
