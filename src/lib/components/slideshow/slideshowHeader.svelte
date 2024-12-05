<script>
  let props = $props();
  import Newslideshow from "$lib/components/slideshow/newSlideshowModal.svelte";

  let showNewslideshowModal = $state(false);

  function toggleNewslideshowModal() {
    showNewslideshowModal = !showNewslideshowModal;
  }

  function submitNewslideshowModal(event) {
    console.log(event.target);
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
    doSubmit={submitNewslideshowModal}
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
        value={props.searchTerm}
        oninput={props.searchTermUpdate}
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
