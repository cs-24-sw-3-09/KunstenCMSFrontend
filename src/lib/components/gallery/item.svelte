<script>
    let { item, doToggleEditModal, doToggleItemModal } = $props();

    import { enhance } from '$app/forms';

    import Tag from "$lib/components/gallery/tag.svelte";

</script>

<div class="gallery-item">
    <div class="gallery-item-left" onclick={doToggleItemModal}>
      <div class="gallery-item-preview">
        <img src={item.location} alt="gallery-item-preview" />
      </div>
      <div class="gallery-dot tooltippable tooltipText-Active gallery-{
        item.status === "used" ? "red" : item.status === "planned" ? "yellow" : "green"
      }-dot" ></div>
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
    <div class="gallery-item-right">
      <div class="gallery-item-buttons">
        <form method="post" action="?/deleteVisualMedia" 
        use:enhance={({ formData, cancel }) => {
            // Causes svelte violation warning, because of holdup
            let confirmation = confirm(
                `Are you sure you want to delete "${item.name}"?`,
            );
            if (!confirmation) return cancel();
            
            // `formData` is its `FormData` object that's about to be submitted
            for (const key in item) {
                formData.set(key, item[key]);
            }

            // `formData` is its `FormData` object that's about to be submitted
            formData.set("id", item.id);
        }}>
          <button class="gallery-item-delete-button" type="submit" aria-label="Delete item">
            <i class="fa-solid fa-trash"></i>
          </button>
        </form>
        <button class="gallery-item-replace-button" onclick={doToggleEditModal} aria-label="Edit item">
          <i class="fa-solid fa-exchange"></i>
        </button>
      </div>
      <div class="gallery-item-date">{item.date}</div>
    </div>
  </div>