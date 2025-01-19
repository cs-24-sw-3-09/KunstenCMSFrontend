<script>
  let { item, doToggleEditModal, doToggleItemModal, doToggleReplaceModal, deleteVisualMedia, color } = $props();

  import { enhance } from "$app/forms";
  import { env } from "$env/dynamic/public";
  import { getCookie } from "$lib/utils/getcookie.js";
  import { lazyLoad } from "$lib/utils/lazyload.js";

  import Tag from "$lib/components/gallery/tag.svelte";

  import video_default from "$lib/assets/default_video.png";
  import { Tooltip } from "@svelte-plugins/tooltips";
  import SavedPopup from "../savedpopup.svelte";

  let ButtonDisabled = $state(false);

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
        return "Active";
      case "red":
        return "Not in use";
      case "yellow":
        return "Scheduled";
      default:
        return "Not in use";
    }
  }

  let popup;

  function saveData(success) {
  if (success) {
  popup.show("Your changes have been saved!", "success");
  } else {
  popup.show("Failed to save changes!", "error");
  }
  }

</script>

<div class="gallery-item">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="gallery-item-left" onclick={doToggleItemModal}>
    <div class="gallery-item-preview">
      <SavedPopup bind:this={popup} />
      {#if item.fileType === "video/mp4"}
        <img
          src={video_default}
          style="image-resolution: 300dpi;"
          alt="gallery-item-preview"
        />
      {:else}
        <img use:lazyLoad={env.PUBLIC_API_URL + item.location} style="image-resolution: 300dpi;" alt="gallery-item-preview" />
      {/if}
    </div>

    <Tooltip
    content={getActivity(color)}
    position="top"
    animation= 'slide'>
      <div class="gallery-dot gallery-{color}-dot"></div>
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
        disabled = {ButtonDisabled}
      >
      <Tooltip content="Edit" animation="slide",  position="top">
        <i class="fa-solid fa-pen-to-square {ButtonDisabled === true ? 'disabled' : ''}"></i>
      </Tooltip>
    </button>
      <button
        class="gallery-item-replace-button"
        onclick={() => {doToggleReplaceModal(item)}}
        aria-label="Edit item"
        disabled = {ButtonDisabled}
      >
      <Tooltip content="Replace" animation="slide",  position="top">
        <i class="fa-solid fa-exchange {ButtonDisabled === true ? 'disabled' : ''}"></i>
      </Tooltip>
      </button>
      
      
      <form
        method="post"
        action="?/deleteVisualMedia"
        use:enhance={async ({ formData, cancel }) => {
          ButtonDisabled = true;
          const authToken = getCookie("authToken");
          //console.log(authToken);
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
              "\n\nThe visual media i part of the following slidehows(s):\n";
            for (let name of names) {
              riskString += name + "\n";
            }
          }
          // Causes svelte violation warning, because of holdup
          let confirmation = confirm(
            `Are you sure you want to delete "${item.name}"?${riskString}`,
          );
          if (!confirmation) {
            ButtonDisabled = false;
            return cancel();
          }
          

          formData.set("id", item.id);

          return async ({ result }) => {
            // `result` is an `ActionResult` object
            switch (result.type) {
              case "failure":
                // Handle the error
                alert(
                  `Failed to delete visual media, please reload page (F5).\n${result.data?.error}`,
                );
                ButtonDisabled = false;
                saveData(false);
                break;
              case "success":
                // Handle the success
                saveData(true);
                deleteVisualMedia(result.data.id);
                ButtonDisabled = false;
                break;
            }
          };
        }}
      >
        <button
          class="gallery-item-delete-button"
          type="submit"
          aria-label="Delete item"
          disabled = {ButtonDisabled}
        >
          <Tooltip content="Delete" animation="slide",  position="top">
            <i class="fa-solid fa-trash {ButtonDisabled === true ? 'disabled' : ''}"></i>
          </Tooltip>
        </button>
      </form>
    </div>
    <div class="gallery-item-date-parent">
      <Tooltip content="Last Modified" animation="slide",  position="top">
      <div class="gallery-item-date">{formatModDate}</div>
    </Tooltip>
    </div>
  </div>
</div>

<style>
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>