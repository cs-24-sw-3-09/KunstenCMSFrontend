<script>
    let { items, doToggleNewModal, doToggleEditModal, doDelete, doToggleItemModal, searchTermUpdate, searchTerm, searchTagsUpdate, searchTags } = $props();
    
    import Header from "$lib/components/gallery/header.svelte";
    import Item from "$lib/components/gallery/item.svelte";
</script>

<div class="gallery">
    
    <Header doToggleNewModal={doToggleNewModal} searchTermUpdate={searchTermUpdate} searchTerm={searchTerm} searchTagsUpdate={searchTagsUpdate} searchTags={searchTags} />

    <div class="gallery-list">
        {#each items as item}
            <Item item={item} doDelete={() => (doDelete(item))} doToggleEditModal={() => (doToggleEditModal(item))} doToggleItemModal={() => (doToggleItemModal(item))} />
        {/each}
    </div>

    <!-- replace image for gallery item -->
    <!-- <input
      type="file"
      accept="image/*"
      name="image"
      id="input-replace-image"
      style="display: none"
    /> -->
</div>

<style>
    @import "$lib/styles/gallery.css";
</style>
