
<script>
  import Newslideshow from '$lib/components/newSlideshowModal.svelte';
  
  let showNewslideshowModal = false;

  function toggleNewslideshowModal() {
      showNewslideshowModal = !showNewslideshowModal;
  }

  function submitNewslideshowModal(event) {
      console.log(event.target);
      event.preventDefault();
      let form = new FormData(event.target);
      console.log(form.get("")
      );
  }

</script>


{#if showNewslideshowModal}
  <Newslideshow doClose={toggleNewslideshowModal} doSubmit={submitNewslideshowModal}/>
{/if}



    <div class="slideshows">
      <div class="slideshows-header">
        <button
          class="slideshows-header-upload-button"
          onclick={toggleNewslideshowModal}
        >
          New Slideshow
        </button>
        <input
          class="slideshows-header-input"
          type="text"
          placeholder="search..."
        />
        <label for="slideshows-archived-toggle">Toggle Archived: </label>
        <input
          class="slideshows-header-input"
          id="slideshows-archived-toggle"
          type="checkbox"
        />
      </div>
    </div>
