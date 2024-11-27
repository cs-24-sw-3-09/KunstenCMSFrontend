<script>
    let { item, doToggleItemModal } = $props();

    import Tag from "$lib/components/gallery/tag.svelte";

    console.log(item);

    
</script>

<div class="gallery-item" on:click = {}>
    <div class="gallery-item-left" onclick={doToggleItemModal}>
        <div class="gallery-item-preview">
            <img src={item.location} alt="gallery-item-preview" />
        </div>
        <div class="gallery-item-info">
            <div class="gallery-item-left-top">
                <div class="gallery-item-title">{item.name}</div>
                <div class="gallery-item-description">{item.description}</div>
            </div>
            <div class="gallery-item-left-bottom">
                <div class="gallery-item-tags">
                    {#each item.tags as tag}
                        <Tag tag={tag.text} />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @import "$lib/styles/gallery.css";
</style>