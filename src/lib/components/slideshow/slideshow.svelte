<script>
  import { env } from "$env/dynamic/public";
  //on:click={() => dispatch("archived", props.slideshow.isArchived)}
  let props = $props();
  let hiddenForm;
  let getSSPartOfTSData;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import Slideshowcontent from "./slideshowcontent.svelte";
  import AddMedia from "./addMediaModal.svelte";
  import Button from "$lib/components/modal/button.svelte";
  import { enhance } from "$app/forms";
  import { getCookie } from "$lib/utils/getcookie.js";
 

  import { onMount } from "svelte";
  import Sortable from "sortablejs";
  import { Tooltip } from "@svelte-plugins/tooltips";

  let items = $state(
    props.slideshow.visualMediaInclusionCollection.sort(
      (a, b) => a.slideshowPosition - b.slideshowPosition
    ),
  );
  
  let status = $derived.by(() => (props.status.find((row) => row.slideshowId == props.slideshow.id)));
  let color = $derived.by(() => status?.color);
  let screens = $derived.by(() => status?.displayDevices);

  let listElement;
  let ButtonDisabled = $state(false);

  onMount(async () => {
    new Sortable(listElement, {
      animation: 150,
      filter: ".non-draggable",
      preventOnFilter: false,
      onEnd: (event) => {
        const [movedItem] = items.splice(event.oldIndex, 1);
        items.splice(event.newIndex, 0, movedItem);
        items.forEach((item, i) => {
          item.slideshowPosition = i + 1;
        });
        hiddenForm.requestSubmit();
        dispatch("updateOrder", items);
      },
    });
  });


  // svelte-ignore non_reactive_update
  let showAddMediaModal = $state(false);

  function toggleAddMediaModal() {
    showAddMediaModal = !showAddMediaModal;
  }

  function submitAddMediaModal(event) {
    event.preventDefault();
    let form = new FormData(event.target);
  }

  function getActivity(color) {
    switch (color) {
      case "green":
        return "Active";
      case "red":
        return "Inactive";
      case "yellow":
        return "Scheduled";
      default:
        return "";
    }
  }

</script>

{#if showAddMediaModal}
  <AddMedia
    doClose={toggleAddMediaModal}
    Item={props.filteredVisualMedia}
    searchTerm={props.searchTerm}
    searchTags={props.searchTags}
    searchTermUpdate={props.searchTermUpdate}
    searchTagsUpdate={props.searchTagsUpdate}
    slideshowID = {props.slideshow.id}
    VMIForSS={props.VMIForSS}
    updateSlideshowContent={props.updateSlideshowContent}
    saveData={props.saveData}
  />
{/if}

<div class="slideshows-item active">
  <div class="slideshows-item-header">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore event_directive_deprecated -->
    <div class="slideshows-item-header-top">
      <div
        class="slideshows-item-header-left"
        on:click={() => dispatch("update", props.slideshow.id)}
      >
        <div class="slideshows-item-header-arrow">
          <i class="fa-solid slideshow-arrow fa-caret-{props.selectedId == props.slideshow.id ? "down" : "right"}" aria-hidden="true">
          </i>
        </div>
        <Tooltip
        content={getActivity(color)}
        position="top"
        animation= "slide"
        >
        <div
          class="slideshows-item-header-activity tooltippable tooltipText-Active slideshows-{color}-dot"
        ></div>
      </Tooltip>
        <form
          method="post"
          action="?/patchSSName"
          use:enhance={({ formData }) => {
            formData.set("slideshowId", props.slideshow.id);
            formData.set("newName", props.slideshow.name);

            return async ({ result }) => {};
          }}
        >
          <div class="slideshows-item-header-title">
            <input
              type="text"
              value={props.slideshow.name}
              class="unstyled-input"
              on:click|stopPropagation
              on:change={(event) => {
                props.slideshow.name = event.target.value;
                event.target.form.requestSubmit();
              }}
            />
          </div>
        </form>
      </div>

      <div class="slideshows-item-header-right">
        <div class="slideshows-item-header-action" aria-hidden="true">
          <Tooltip content="Focus mode" animation="slide",  position="top">
          <i
            class="fa-solid fa-{props.focusedSlideshow != null ? "eye-slash" : "eye"}"
            on:click={() => dispatch("focus", props.slideshow.id)}
          ></i>
          </Tooltip>
        </div>
        <form
          method="post"
          action="?/changeArchviedState"
          use:enhance={({ formData }) => {
            ButtonDisabled = true;
            formData.set("isArchived", !props.slideshow.isArchived);
            formData.set("slideshowID", props.slideshow.id);

            return async ({ result }) => {
              // `result` is an `ActionResult` object
              if (result.type === "failure") {
                // Handle the error
                alert(
                  `Failed to change slideshow to archived status, please reload page (F5).\n${result.data?.error}`,
                );
                props.saveData(false);
                ButtonDisabled = false;
              } else if (result.type === "success") {
                props.updateSlideshowContent(result.data.newData);
                ButtonDisabled = false;
                props.saveData(true);
              }
            };
          }}
        >
          <div class="slideshows-item-header-action">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
              type="submit"
              style="all: unset; display: inline-block; cursor: pointer;"
              disabled = {ButtonDisabled}
              
            >
              <!-- svelte-ignore element_invalid_self_closing_tag -->
              <Tooltip content="Archive" animation="slide",  position="top">
                <i class="fa-solid fa-box-archive {ButtonDisabled === true ? 'disabled' : ''}" />
              </Tooltip>
            </button>
          </div>
        </form>
        <!-- Copy slideshow -->
        <form
          method="post"
          action="?/cloneSS"
          use:enhance={({ formData }) => {
            ButtonDisabled = true;
            formData.set("slideshow", JSON.stringify(props.slideshow));

            return async ({ result }) => {
              // `result` is an `ActionResult` object
              if (result.type === "failure") {
                // Handle the error
                alert(
                  `Failed to clone slideshow, please reload page (F5).\n${result.data?.error}`,
                );
                ButtonDisabled = false;
                props.saveData(false);
              } else if (result.type === "success") {
                props.updateSlideshowContent(result.data.newData);
                ButtonDisabled = false;
                props.saveData(true);
              }
            };
          }}
        >
          <div class="slideshows-item-header-action">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
              type="submit"
              style="all: unset; display: inline-block; cursor: pointer;"
              disabled = {ButtonDisabled}
            >
              <!-- svelte-ignore element_invalid_self_closing_tag -->
              <Tooltip content="Duplicate" animation="slide",  position="top">
                <i class="fa-solid fa-copy {ButtonDisabled === true ? 'disabled' : ''}" />
              </Tooltip>
            </button>
          </div>
        </form>

        <!-- Delete slideshow -->
        <form
          method="post"
          action="?/deleteSlideshow"
          use:enhance={async ({ formData, cancel }) => {
            ButtonDisabled = true;
            // Causes svelte violation warning, because of holdup

            const authToken = getCookie("authToken");

            let informationDataTimeSlot = await fetch(env.PUBLIC_API_URL + "/api/slideshows/"+ props.slideshow.id +"/time_slots", {
              headers: {"Authorization": 'Bearer ' + authToken},
            });
            let informationDataFallback = await fetch(env.PUBLIC_API_URL + "/api/slideshows/"+ props.slideshow.id +"/fallbackContent",{headers: {"Authorization": 'Bearer ' + authToken},
            });

            const riskInformationFallback = await informationDataFallback.json();
            let riskString = "";
            if(riskInformationFallback != 0){
              riskString += 
              "\n\nThe slideshow is used as fallback for the following display device(s):\n" + riskInformationFallback.map((risk) => risk.name).join("\n");
            }

            const riskInformationTimeSlot = await informationDataTimeSlot.json();
            if (riskInformationTimeSlot.length != 0) {
              riskString +=
                "\n\nThe slideshow is part of the following timeslot(s):\n"+riskInformationTimeSlot.map((risk) => risk.name).join("\n")
                  + "\n \nNOTE: If the slideshow is deleted, all associated timeslots will also be deleted";
            }

            let confirmation = confirm(
              `Are you sure you want to delete "${props.slideshow.name}"? ${riskString}`,
            );
            if (!confirmation) {
              ButtonDisabled = false;
              return cancel()
            };

            formData.set("slideshowID", props.slideshow.id);

            return async ({ result }) => {
              // `result` is an `ActionResult` object
              if (result.type === "failure") {
                // Handle the error
                alert(
                  `Failed to delete slideshow, please reload page (F5).\n${result.data?.error}`,
                );
                ButtonDisabled = false;
                props.saveData(false);
              } else if (result.type === "success") {
                props.updateSlideshowContent(result.data.newData);
                ButtonDisabled = false;
                props.saveData(true);
              }
            };
          }}
        >
          <div class="slideshows-item-header-action">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
              type="submit"
              style="all: unset; display: inline-block; cursor: pointer;"
              disabled = {ButtonDisabled}
            >
              <!-- svelte-ignore element_invalid_self_closing_tag -->
              <Tooltip content="Delete" animation="slide",  position="top">
                <i class="fa-solid fa-trash {ButtonDisabled === true ? 'disabled' : ''}" />
              </Tooltip>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- For show the display devies -->
    <div class="slideshows-item-header-bottom">
      <Tooltip
        content="Live Devices"
        position="top"
        animation="slide"
      >
        <i class="fa-solid fa-tower-cell {ButtonDisabled === true ? 'disabled' : ''}"></i>
      </Tooltip>
      <div class="slideshows-item-live-list">
        {#each screens as screen}
          <div class="slideshows-item-live-screen">{screen.name}</div>
        {/each}
      </div>
    </div>
  </div>
  <!-- Makeing the VMI list -->
  <div class="slideshows-item-body">
    <div class="slideshows-body-line"></div>
    <div class="slideshows-body-list" style="display: {props.selectedId == props.slideshow.id
      ? 'block'
      : 'none'}">
      <div bind:this={listElement}>
        {#each props.slideshow.visualMediaInclusionCollection as VMI}
          {#if props.selectedId === props.slideshow.id}
          <Slideshowcontent
            {VMI}
            slideshowID = {props.slideshow.id}
            slideshow={props.slideshow}
            form={props.form}
            updateSlideshowContent={props.updateSlideshowContent}
            saveData = {props.saveData}
          />
          {/if}
        {/each}
        <form
          method="post"
          action="?/patchNewVMIOrder"
          use:enhance={({ formData }) => {
            formData.set("slideorder", JSON.stringify(items));
            formData.set("slideshowId", props.slideshow.id);

            return async ({ result }) => {
              // `result` is an `ActionResult` object
              if (result.type === "failure") {
                props.saveData(false);
                // Handle the error
              } else if (result.type === "success") {
                props.saveData(true);
              }
            };
          }}
          bind:this={hiddenForm}
          style="display: none;"
        >
          <input type="hidden" name="updatedOrder" />
        </form>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore event_directive_deprecated -->
      </div>
      <div class="slideshows-body-add" on:click={toggleAddMediaModal}>
        <i class="fa-solid fa-plus"></i> Add Media
      </div>
    </div>
  </div>
</div>

<style>
  .unstyled-input {
    all: inherit; /* Inherit all styles from the parent */
    background: transparent; /* Remove input background */
    padding: 0; /* Remove extra padding */
    margin: 0; /* Remove extra margin */
    display: block;
    padding: 4px;
    width: 100%;
    transition: all 0.05s;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    /*outline: none; /* Disable focus outline */
  }

  .unstyled-input:hover {
    cursor: text;
  }


  .disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
</style>


