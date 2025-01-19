<script>
  let props = $props();
  import Newslideshow from "./newSlideshowModal.svelte";

  let showNewslideshowModal = $state(false);

  function toggleNewslideshowModal() {
    showNewslideshowModal = !showNewslideshowModal;
  }

  function submitNewslideshowModal(event) {
    event.preventDefault();
    let form = new FormData(event.target);
  }

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let checked = $state(false);
</script>

{#if showNewslideshowModal}
  <Newslideshow
    doClose={toggleNewslideshowModal}
    allContent = {props.allContent}
    updateSlideshowContent = {props.updateSlideshowContent}
    saveData={props.saveData}
  />
{/if}

<div class="slideshows">
  <div class="slideshows-header">
    <button
      class="slideshows-header-upload-button"
      onclick={toggleNewslideshowModal}
    >
      New Slideshow
    </button>
    <div class = "add-media-modal-search">
      <input
        type="text"
        placeholder="Search for slideshow"
        value={props.searchSlideshow}
        oninput={props.searchSlideshowUpdate}
      />
    </div>
    <label for="slideshows-archived-toggle"> Toggle Archived: </label>
    <input
      class="slideshows-header-input"
      id="slideshows-archived-toggle"
      type="checkbox"
      bind:checked
      onclick={() => dispatch("update", checked)}
    />
  </div>
</div>
