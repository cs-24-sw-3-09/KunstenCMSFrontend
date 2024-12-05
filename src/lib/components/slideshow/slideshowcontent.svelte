<script>
  const API_URL = import.meta.env.VITE_API_URL;
  import { enhance } from "$app/forms";
  import { slide } from "svelte/transition";
  import { getCookie } from "$lib/utils/getcookie.js";

  let props = $props();
  let VMI = props.VMI;
  let slideshowId = props.slideshow.id;
  let test1 = props.slideshow;
</script>

<div draggable="true" class="slideshows-body-item">
  <div class="slideshows-body-item-preview">
    <img
      src={VMI.visualMedia ? `${API_URL}${VMI.visualMedia.location}` : ""}
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
    <form
      method="post"
      action="?/deleteVM"
      use:enhance={async ({ formData, cancel }) => {
        // Causes svelte violation warning, because of holdup

        const authToken = getCookie("authToken");

        let informationData = await fetch(
          API_URL + "/api/slideshows/" + slideshowId + "/time_slots",
          {
            headers: { Authorization: "Bearer " + authToken },
          },
        );

        const riskInformation = await informationData.json();


        let names = riskInformation.map((risk) => risk.name);
        let riskString = "";
        if (names.length != 0) {
          riskString =
            "\n\nThe visual media is part of the following timeslot(s):\n";
          for (let name of names) {
            riskString += name + "\n";
          }
        }

        let confirmation = confirm(
          `Are you sure you want to delete "${VMI.visualMedia.name}"? ${riskString}`,
        );
        if (!confirmation) return cancel();

        // let confirmation = confirm(`Are you sure you want to delete "${VMI}"?`);
        // if (!confirmation) return cancel();
        formData.set("ContentID", VMI.id);

        return async ({ result }) => {
          // `result` is an `ActionResult` object
          if (result.type === "failure") {
            // Handle the error
            alert(
              `Failed to delete visual media, please reload page (F5).\n${result.data?.error}`,
            );
          } else if (result.type === "success") {
            console.log("here123")
            props.updateSlideshowContent(result.data.newData);
            
          }
        };
      }}
    >
      <div class="slideshows-item-header-action">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
          type="submit"
          style="all: unset; display: inline-block; cursor: pointer;"
        >
          <!-- svelte-ignore element_invalid_self_closing_tag -->
          <i class="fa-solid fa-trash" />
        </button>
      </div>
    </form>
    <div class="slideshows-body-item-action-hand">
      <i class="fa-solid fa-hand"></i>
    </div>
  </div>
</div>
