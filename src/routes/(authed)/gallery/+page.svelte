<script>
    // Export form
    let { data, form } = $props(); // Is automatically populated by SvelteKit

    import Gallery from "$lib/components/gallery/gallery.svelte";
    import ItemModal from "$lib/components/gallery/itemmodal.svelte";
    import NewModal from "$lib/components/gallery/newmodal.svelte";
    import EditModal from "$lib/components/gallery/editmodal.svelte";
    import ReplaceModal from "$lib/components/gallery/replacemodal.svelte";
    import { onMount } from "svelte";

    import { env } from "$env/dynamic/public";
    import { getCookie } from "$lib/utils/getcookie.js";
    
    let visual_medias = $state(data.visualMedias);
    let color = $state([]);

    onMount(async () => {
        const colorData = await fetch(env.PUBLIC_API_URL + "/api/visual_medias/states", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getCookie("authToken"),
            }
        });
        color = await colorData.json();
    })

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

    function updateTags(body) {
        const index = visual_medias.findIndex((item) => item.id === body.id);
        if (index !== -1) {
            visual_medias[index].tags = body.tags;
        }
    }

    function delTag(id, tagId) {
        let index = -1;
        for (let i = 0; i < visual_medias.length; i++) {
            if (visual_medias[i].id == id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            for (let i = 0; i < visual_medias[index].tags.length; i++) {
                if (visual_medias[index].tags[i].id == tagId) {
                    visual_medias[index].tags.splice(i, 1);
                    break;
                }
            }
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
    let showReplaceModal = $state(false);

    function doToggleItemModal(item=focusItem) {
        focusItem = item;
        showEditModal = false;
        showNewModal = false;
        showReplaceModal = false;
        showItemModal = !showItemModal;
    }

    function doToggleNewModal() {
        focusItem = {};
        showEditModal = false;
        showItemModal = false;
        showReplaceModal = false;
        showNewModal = !showNewModal;
    }

    function doToggleEditModal(item) {
        focusItem = item;
        showItemModal = false;
        showNewModal = false;
        showReplaceModal = false;
        showEditModal = !showEditModal;
    }

    function doToggleReplaceModal(item) {
        focusItem = item;
        showItemModal = false;
        showNewModal = false;
        showEditModal = false;
        showReplaceModal = !showReplaceModal;
    }
</script>

<div class="main-content">
    <div class="page">
        <Gallery
            visualMedias={filteredData}
            doToggleNewModal={doToggleNewModal}
            doToggleEditModal={doToggleEditModal}
            doToggleItemModal={doToggleItemModal}
            doToggleReplaceModal={doToggleReplaceModal}
            searchTermUpdate={searchTermUpdate}
            searchTerm={searchTerm}
            searchTagsUpdate={searchTagsUpdate}
            searchTags={searchTags}
            deleteVisualMedia={deleteVisualMedia}
            color = {color}
        />
    </div>
</div>

{#if showNewModal}
    <NewModal doClose={doToggleNewModal} createVisualMedia={createVisualMedia} />
{/if}
{#if showEditModal}
    <EditModal item={focusItem} doClose={doToggleEditModal} updateVisualMedia={updateVisualMedia} />
{/if}
{#if showReplaceModal}
    <ReplaceModal item={focusItem} doClose={doToggleReplaceModal} updateVisualMedia={updateVisualMedia} />
{/if}
{#if showItemModal}
    <ItemModal item={focusItem} doClose={doToggleItemModal} updateTags={updateTags} delTag={delTag} />
{/if}

<style>
    @import "$lib/styles/gallery.css";
</style>
