<script>
  import updateVMIForSS from "$lib/../routes/(authed)/slideshows/serverReq.js";
  import { enhance } from "$app/forms";
  import { slide } from "svelte/transition";
  let props = $props();
  let VMI = props.VMI;
  let slideshowId = props.slideshowId;
  let test1 = props.slideshow;

  async function updateSlideDuration(newDuration) {
    // Create the data to send
    await updateVMIForSS(props.slideshow, newDuration, VMI);
  }
</script>

<div class="slideshows-item-body">
  <div class="slideshows-body-line"></div>
  <div class="slideshows-body-list">
    <div draggable="true" class="slideshows-body-item">
      <div class="slideshows-body-item-preview">
        <img
          src={VMI.visualMedia
            ? `http://152.53.110.114:8080${VMI.visualMedia.location}`
            : ""}
          alt="Media"
        />
      </div>
      <div class="slideshows-body-item-num">
        {VMI.slideshowPosition}
      </div>
      <div class="slideshows-body-item-title">
        {VMI.visualMedia ? VMI.visualMedia.name : "No name"}
      </div>
      <div class="slideshows-body-item-settings">
        <div class="slideshows-body-item-duration">
          <div class="slideshows-body-item-duration-icon">
            <i class="fa-regular fa-clock"></i>
          </div>
          <div class="slideshows-body-item-duration-title">Duration:</div>
          <div class="slideshows-body-item-duration-input non-draggable">
            {#if VMI.visualMedia && (VMI.visualMedia.fileType == "image/jpeg" || VMI.visualMedia.fileType == "image/png")}
              <form
                method="post"
                action="?/updateVMIForSS"
                use:enhance={({ formData }) => {
                  formData.set("slideshow", JSON.stringify(props.slideshow));
                  formData.set("newDuration", VMI.slideDuration);
                  formData.set("VMI", JSON.stringify(VMI));

                  return async ({ result }) => {};
                  return true;
                }}
              >
                <input
                  type="text"
                  value={VMI.slideDuration}
                  onchange={(event) => {
                    VMI.slideDuration = event.target.value;
                    event.target.form.requestSubmit();
                  }}
                />
              </form>
            {:else}
              <label for="country">
                {VMI.visualMedia ? VMI.slideDuration : 0}:
              </label>
            {/if}
          </div>
        </div>
      </div>
      <div class="slideshows-body-item-actions">
        <div class="slideshows-body-item-action-trash">
          <i class="fa-solid fa-trash"></i>
        </div>
        <div class="slideshows-body-item-action-hand">
          <i class="fa-solid fa-hand"></i>
        </div>
      </div>
    </div>
  </div>
</div>
