<script>
    let {
        visualMedias,
        doToggleNewModal,
        doToggleEditModal,
        doDelete,
        doToggleItemModal,
        doToggleReplaceModal,
        searchTermUpdate,
        searchTerm,
        searchTagsUpdate,
        searchTags,
        deleteVisualMedia,
        color,
        item,
    } = $props();

    import Header from "$lib/components/gallery/header.svelte";
    import Item from "$lib/components/gallery/item.svelte";
</script>

<div class="gallery">
    <Header
        {doToggleNewModal}
        {searchTermUpdate}
        {searchTerm}
        {searchTagsUpdate}
        {searchTags}
    />

    <div class="gallery-list">
        {#each visualMedias as VM}
            <Item
                item={VM}
                doDelete={() => doDelete(VM)}
                doToggleEditModal={() => doToggleEditModal(VM)}
                doToggleReplaceModal={() => (doToggleReplaceModal(VM))}
                doToggleItemModal={() => doToggleItemModal(VM)}
                {deleteVisualMedia}
                color = {color.find((row) => row.visualMediaId == VM.id)
                    ?.color}
            />
        {/each}
    </div>
</div>

<style>
    @import "$lib/styles/gallery.css";
</style>
