<script>
    let { item, doDelete, doToggleEditModal, doToggleItemModal } = $props();

    import Tag from "$lib/components/gallery/tag.svelte";

</script>

<div class="gallery-item">
    <div class="gallery-item-left" onclick={doToggleItemModal}>
      <div class="gallery-item-preview">
        <img src={item.image} alt="gallery-item-preview" />
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
                <Tag tag={tag} />
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="gallery-item-right">
      <div class="gallery-item-buttons">
        <button class="gallery-item-delete-button" onclick={doDelete}>
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="gallery-item-replace-button" onclick={doToggleEditModal}>
          <i class="fa-solid fa-exchange"></i>
        </button>
      </div>
      <div class="gallery-item-date">{item.date}</div>
    </div>
  </div>