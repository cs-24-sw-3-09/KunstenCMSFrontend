<script>
    import { env } from "$env/dynamic/private";
    let { item, toggleAddMediaModal, selectedId,  } = $props();

    import Tag from "$lib/components/gallery/tag.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import video_default from "$lib/assets/default_video.png";
</script>

<div class="gallery-item" style = "background: {selectedId == item.id ? "lightblue" : "lightgray"}" onclick={() => dispatch("update", item.id)}>
    <div class="gallery-item-left" onclick={toggleAddMediaModal}>
        <div class="gallery-item-preview">
            {#if item.fileType === "video/mp4"}
                <img src={video_default} style="image-resolution: 300dpi;" alt="gallery-item-preview">
            {:else}
                <img src={env.CLIENT_API_URL + item.location} alt="gallery-item-preview" />
            {/if}
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