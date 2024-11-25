<script>
    import Gallery from "$lib/components/gallery/gallery.svelte";
    import ItemModal from "$lib/components/gallery/itemmodal.svelte";
    import NewModal from "$lib/components/gallery/newmodal.svelte";
    import EditModal from "$lib/components/gallery/editmodal.svelte";
    
    // mock data
    let data = $state([
        {
            name: "Artwork 1",
            description: "This is a beautiful artwork",
            tags: ["art", "painting", "abstract"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-01-01",
        },
        {
            name: "Artwork 2",
            description: "This is another amazing artwork",
            tags: ["art", "sculpture", "modern"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-01-01",
        },
        {
            name: "Artwork 3",
            description: "This artwork is unique",
            tags: ["art", "photography", "landscape"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-01-01",
        },
        {
            name: "Artwork 4",
            description: "This artwork is mesmerizing",
            tags: ["art", "drawing", "realism"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-01-01",
        },
        {
            name: "Artwork 5",
            description: "This artwork is thought-provoking",
            tags: ["art", "installation", "conceptual"],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            date: "2023-01-01",
        },
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

    function doToggleItemModal(item) {
        focusItem = item;
        showEditModal = false;
        showNewModal = false;
        showItemModal = !showItemModal;
        console.log("showItemModal: ", showItemModal);
    }

    function doToggleNewModal() {
        focusItem = {};
        showEditModal = false;
        showItemModal = false;
        showNewModal = !showNewModal;
        console.log("showNewModal: ", showNewModal);
    }

    function doToggleEditModal(item) {
        focusItem = item;
        showItemModal = false;
        showNewModal = false;
        showEditModal = !showEditModal;
        console.log("showEditModal: ", showEditModal);
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

    function doSubmitTag(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        console.log("Tag submitted:");
        console.log(data);
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
    <ItemModal item={focusItem} doClose={doToggleItemModal} onTagSubmit={doSubmitTag} />
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
