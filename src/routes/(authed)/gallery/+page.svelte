<script>
    // Export form
    let { data, form } = $props(); // Is automatically populated by SvelteKit
    
    const API_URL = import.meta.env.VITE_API_URL;

    import Gallery from "$lib/components/gallery/gallery.svelte";
    import ItemModal from "$lib/components/gallery/itemmodal.svelte";
    import NewModal from "$lib/components/gallery/newmodal.svelte";
    import EditModal from "$lib/components/gallery/editmodal.svelte";
    
    // mock data
    // import { testVisualMedia } from "$lib/testdata.js";

    // Data
    let visual_medias = $state(data.visualMedias.content);
    //$inspect(visual_medias);

    function updateVisualMedia(updatedItem) {
        // Update the item in the state
        // if the item is not found, create a new one
        const index = visual_medias.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
            visual_medias[index] = updatedItem;
        }
    }

    function createVisualMedia(newItem) {
        // adds item to state
        visual_medias = [...visual_medias, newItem];
    }

    function deleteVisualMedia(id) {
        // Delete the item from the state
        // Svelte reative variables dose not like filter functions, or any smart indexing functions
        // Therefore the indexx and splice is done manually
        let index = -1;
        for (let i = 0; i < visual_medias.length; i++) {
            if (visual_medias[i].id == id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            visual_medias.splice(index, 1); // Directly remove the item
        }
    }
    
    // Focus item for modals and such

    let focusItem = $state({});

    // Search/filtering
    
    let searchTerm = $state(""); // For live text search
    let searchTags = $state(""); // For tag-based filtering
    
    function filterItems(items, searchTerm, searchTags) {
        if (searchTerm) {
            // Filter by name
            items = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (searchTags && searchTags.length > 0) {
            // Filter by tags, if any/some part of the tag is included in the search
            items = items.filter((item) => item.tags.some((tag) =>tag.text.toLowerCase().includes(searchTags.toLowerCase())));
        }
        return items;
    }
    
    let filteredData = $derived.by(() => {
        return filterItems(visual_medias, searchTerm, searchTags);
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
            deleteVisualMedia={deleteVisualMedia}
        />
    </div>
</div>

{#if showNewModal}
    <NewModal doClose={doToggleNewModal} createVisualMedia={createVisualMedia} />
{/if}
{#if showEditModal}
    <EditModal item={focusItem} doClose={doToggleEditModal} updateVisualMedia={updateVisualMedia} />
{/if}
{#if showItemModal}
    <ItemModal item={focusItem} doClose={doToggleItemModal} />
{/if}

<style>
    @import "$lib/styles/gallery.css";
</style>
