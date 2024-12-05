<script>
    let { items, doToggleNewModal, doToggleEditModal, doDelete, doToggleItemModal, searchTermUpdate, searchTerm, searchTagsUpdate, searchTags, deleteVisualMedia } = $props();
    
    import Header from "$lib/components/gallery/header.svelte";
    import Item from "$lib/components/gallery/item.svelte";
</script>

<div class="gallery">
    
    <Header doToggleNewModal={doToggleNewModal} searchTermUpdate={searchTermUpdate} searchTerm={searchTerm} searchTagsUpdate={searchTagsUpdate} searchTags={searchTags} />

    <div class="gallery-list">
        {#each items as item}
            <Item item={item} doDelete={() => (doDelete(item))} doToggleEditModal={() => (doToggleEditModal(item))} doToggleItemModal={() => (doToggleItemModal(item))} deleteVisualMedia={deleteVisualMedia} />
        {/each}
    </div>
</div>

<style>
    @import "$lib/styles/gallery.css";
</style>
