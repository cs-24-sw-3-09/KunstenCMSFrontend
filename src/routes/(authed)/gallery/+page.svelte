<script>
    // Export form
    let { form } = $props(); // Is automatically populated by SvelteKit
    
    import Gallery from "$lib/components/gallery/gallery.svelte";
    import ItemModal from "$lib/components/gallery/itemmodal.svelte";
    import NewModal from "$lib/components/gallery/newmodal.svelte";
    import EditModal from "$lib/components/gallery/editmodal.svelte";
    
    // mock data
    import { testVisualMedia } from "$lib/testdata.js";
    
    let data = $state(testVisualMedia);
    
    let focusItem = $state({});

    // Search/filtering
    
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
    
    // Toggles

    let showItemModal = $state(false);
    let showNewModal = $state(false);
    let showEditModal = $state(false);

    function doToggleItemModal(item=focusItem) {
        focusItem = item;
        showEditModal = false;
        showNewModal = false;
        showItemModal = !showItemModal;
    }

    function doToggleNewModal() {
        focusItem = {};
        showEditModal = false;
        showItemModal = false;
        showNewModal = !showNewModal;
    }

    function doToggleEditModal(item) {
        focusItem = item;
        showItemModal = false;
        showNewModal = false;
        showEditModal = !showEditModal;
    }
</script>

<div class="main-content">
    <div class="page">
        <Gallery
            items={filteredData}
            doToggleNewModal={doToggleNewModal}
            doToggleEditModal={doToggleEditModal}
            doToggleItemModal={doToggleItemModal}
            searchTermUpdate={searchTermUpdate}
            searchTerm={searchTerm}
            searchTagsUpdate={searchTagsUpdate}
            searchTags={searchTags}
        />
    </div>
</div>

{#if showNewModal}
    <NewModal doClose={doToggleNewModal}  />
{/if}
{#if showEditModal}
    <EditModal item={focusItem} doClose={doToggleEditModal} />
{/if}
{#if showItemModal}
    <ItemModal item={focusItem} doClose={doToggleItemModal} />
{/if}

<style>
    @import "$lib/styles/gallery.css";
</style>
