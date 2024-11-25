<script>
    let { items } = $props();
    
    import Header from "$lib/components/gallery/header.svelte";
    import Item from "$lib/components/gallery/item.svelte";

</script>

<div class="gallery">
    
    <Header />

    <div class="gallery-list">
        {#each items as item}
            <Item item={item} />
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
