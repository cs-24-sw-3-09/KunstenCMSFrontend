<script>
  let { item, doToggleEditModal, doToggleItemModal, doToggleReplaceModal, deleteVisualMedia, color } = $props();

  import { enhance } from "$app/forms";

  import Tag from "$lib/components/gallery/tag.svelte";

  import { env } from '$env/dynamic/public';

  import video_default from "$lib/assets/default_video.png";


  let modDate = $state(new Date(item.lastDateModified));
  let formatModDate = $derived.by(() => modDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }));

</script>

<div class="gallery-item">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="gallery-item-left" onclick={doToggleItemModal}>
    <div class="gallery-item-preview">
      {#if item.fileType === "video/mp4"}
        <img src={video_default} style="image-resolution: 300dpi;" alt="gallery-item-preview">
      {:else}
        <img src={env.PUBLIC_API_URL + item.location} style="image-resolution: 300dpi;" alt="gallery-item-preview" />
      {/if}
    </div>

    <div
          class="gallery-dot tooltippable tooltipText-Active gallery-{color}-dot"
        ></div>
    <div class="gallery-item-info">
      <div class="gallery-item-left-top">
        <div class="gallery-item-title">{item.name}</div>
        <div class="gallery-item-description">{item.description}</div>
      </div>
      <div class="gallery-item-left-bottom">
        <div class="gallery-item-tags">
          {#if item.tags}
            {#each item.tags as tag}
              <Tag tag={tag.text} />
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="gallery-item-right">
    <div class="gallery-item-buttons">
      <button
        class="gallery-item-replace-button"
        onclick={doToggleEditModal}
        aria-label="Edit item"
      >
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button
        class="gallery-item-replace-button"
        onclick={doToggleReplaceModal}
        aria-label="Edit item"
      >
        <i class="fa-solid fa-exchange"></i>
      </button>
      <form
        method="post"
        action="?/deleteVisualMedia"
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

          return async ({ result }) => {
            // `result` is an `ActionResult` object
            switch (result.type) {
              case "failure":
                // Handle the error
                alert(`Failed to delete visual media, please reload page (F5).\n${result.data?.error}`);
                break;
              case "success":
                // Handle the success
                deleteVisualMedia(result.data.id);
                break;
            }
          };
        }}
      >
        <button
          class="gallery-item-delete-button"
          type="submit"
          aria-label="Delete item"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </form>
    </div>
    <div class="gallery-item-date">{formatModDate}</div>
  </div>
</div>
