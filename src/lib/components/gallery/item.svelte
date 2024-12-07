<script>
  let { item, doToggleEditModal, doToggleItemModal, deleteVisualMedia } =
    $props();

  import { enhance } from "$app/forms";
  import { env } from "$env/dynamic/public";
  import { getCookie } from "$lib/utils/getcookie.js";

  import Tag from "$lib/components/gallery/tag.svelte";

  import video_default from "$lib/assets/default_video.png";
</script>

<div class="gallery-item">
  <div class="gallery-item-left" onclick={doToggleItemModal}>
    <div class="gallery-item-preview">
      {#if item.fileType === "video/mp4"}
        <img
          src={video_default}
          style="image-resolution: 300dpi;"
          alt="gallery-item-preview"
        />
      {:else}
        <img
          src={item.src}
          style="image-resolution: 300dpi;"
          alt="gallery-item-preview"
        />
      {/if}
    </div>
    <!-- <div
      class="gallery-dot tooltippable tooltipText-Active gallery-{item.status ===
      'used'
        ? 'red'
        : item.status === 'planned'
          ? 'yellow'
          : 'green'}-dot"
    ></div> -->
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
      <form
        method="post"
        action="?/deleteVisualMedia"
        use:enhance={async ({ formData, cancel }) => {
          const authToken = getCookie("authToken");
          console.log(authToken);
          let informationData = await fetch(
            env.PUBLIC_API_URL + "/api/" + item.id + "/slideshows",
            {
              headers: { Authorization: "Bearer " + authToken },
            },
          );

          const riskInformation = await informationData.json();

          let names = riskInformation.map((risk) => risk.name);
          let riskString = "";
          if (names.length != 0) {
            riskString =
              "\n\nThe visual media i part of the following timeslot(s) and slidehows(s):\n";
            for (let name of names) {
              riskString += name + "\n";
            }
          }
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
                alert(
                  `Failed to delete visual media, please reload page (F5).\n${result.data?.error}`,
                );
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
      <button
        class="gallery-item-replace-button"
        onclick={doToggleEditModal}
        aria-label="Edit item"
      >
        <i class="fa-solid fa-exchange"></i>
      </button>
    </div>
    <div class="gallery-item-date">{item.date}</div>
  </div>
</div>
