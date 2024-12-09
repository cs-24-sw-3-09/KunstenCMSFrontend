<script>
  let { item, doToggleEditModal, doToggleItemModal, doToggleReplaceModal, deleteVisualMedia, color } = $props();

  import { enhance } from "$app/forms";
  import { env } from "$env/dynamic/public";
  import { getCookie } from "$lib/utils/getcookie.js";

  import Tag from "$lib/components/gallery/tag.svelte";

  import video_default from "$lib/assets/default_video.png";
  import { Tooltip } from "@svelte-plugins/tooltips";


  let modDate = $state(new Date(item.lastDateModified));
  let formatModDate = $derived.by(() => modDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }));

  function getActivity(color) {
    switch (color) {
      case "green":
        return "Active"
        break;
      case "red":
        return "Inactive"
        break
      case "yellow":
        return "Scheduled"
        break;
      default:
        return "Not in use"
        break;
    }
  }

</script>

<div class="gallery-item">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="gallery-item-left" onclick={doToggleItemModal}>
    <div class="gallery-item-preview">
      {#if item.fileType === "video/mp4"}
        <img
          src={video_default}
          style="image-resolution: 300dpi;"
          alt="gallery-item-preview"
        />
      {:else}
        <img src={env.PUBLIC_API_URL + item.location} fetchpriority="high" loading="eager" style="image-resolution: 300dpi;" alt="gallery-item-preview" />
      {/if}
    </div>

    <Tooltip
    content={getActivity(color)}
    position="top"
    animation= 'slide'>
      <div class="gallery-dot tooltippable tooltipText-Active gallery-{color}-dot"></div>
    </Tooltip>
    <div class="gallery-item-info">
      <div class="gallery-item-left-top">
        <div class="gallery-item-title">{item.name}</div>
        <div class="gallery-item-description">{item.description}</div>
      </div>
      <div class="gallery-item-left-bottom">
        <Tooltip content="Tags" animation="slide",  position="left">
          <div class="gallery-item-tags">
            {#if item.tags}
              {#each item.tags as tag}
                <Tag tag={tag.text} />
              {/each}
            {/if}
          </div>
        </Tooltip>
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
      <Tooltip content="Edit" animation="slide",  position="top">
        <i class="fa-solid fa-pen-to-square"></i>
      </Tooltip>
    </button>
      <button
        class="gallery-item-replace-button"
        onclick={doToggleReplaceModal}
        aria-label="Edit item"
      >
      <Tooltip content="Replace" animation="slide",  position="top">
        <i class="fa-solid fa-exchange"></i>
      </Tooltip>
      </button>
      
      <form
        method="post"
        action="?/deleteVisualMedia"
        use:enhance={async ({ formData, cancel }) => {
          const authToken = getCookie("authToken");
          console.log(authToken);
          let informationData = await fetch(
            env.PUBLIC_API_URL + "/api/visual_medias/" + item.id + "/slideshows",
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
          <Tooltip content="Delete" animation="slide",  position="top">
            <i class="fa-solid fa-trash"></i>
          </Tooltip>
        </button>
      </form>
    </div>
    <Tooltip content="Last Modified" animation="slide",  position="top">
    <div class="gallery-item-date">{formatModDate}</div>
  </Tooltip>
  </div>
</div>
