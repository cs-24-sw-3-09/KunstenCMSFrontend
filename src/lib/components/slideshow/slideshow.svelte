<script>
  import { env } from "$env/dynamic/public";
  let props = $props();
  let hiddenForm;
  let getSSPartOfTSData;
  let color = props.color;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import Slideshowcontent from "./slideshowcontent.svelte";
  import AddMedia from "./addMediaModal.svelte";
  import Button from "$lib/components/modal/button.svelte";
  import { enhance } from "$app/forms";
  import { getCookie } from "$lib/utils/getcookie.js";

  import { onMount } from "svelte";
  import Sortable from "sortablejs";

  let items = $state(
    props.slideshow.visualMediaInclusionCollection.sort(
      (a, b) => a.slideshowPosition - b.slideshowPosition,
    ),
  );
  console.log(items)
  let listElement;

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
    console.log(event.target);
    event.preventDefault();
    let form = new FormData(event.target);
    console.log(form.get(""));
  }
  let slideshowID = $state(props.slideshow.id);
</script>

{#if showAddMediaModal}
  <AddMedia
    doClose={toggleAddMediaModal}
    Item={props.filteredVisualMedia}
    searchTerm={props.searchTerm}
    searchTags={props.searchTags}
    searchTermUpdate={props.searchTermUpdate}
    searchTagsUpdate={props.searchTagsUpdate}
    {slideshowID}
    VMIForSS={props.VMIForSS}
    updateSlideshowContent={props.updateSlideshowContent}
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
        <div
          class="slideshows-item-header-activity tooltippable tooltipText-Active"
          style={"background-color: " + color}
        ></div>
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
          <i
            class="fa-solid fa-{props.focusedSlideshow != null ? "eye-slash" : "eye"}"
            on:click={() => dispatch("focus", props.slideshow.id)}
          ></i>
        </div>
        <form
          method="post"
          action="?/changeArchviedState"
          use:enhance={({ formData }) => {
            formData.set("isArchived", !props.slideshow.isArchived);
            formData.set("slideshowID", props.slideshow.id);

            return async ({ result }) => {
              // `result` is an `ActionResult` object
              if (result.type === "failure") {
                // Handle the error
                alert(
                  `Failed to change slideshow to archived status, please reload page (F5).\n${result.data?.error}`,
                );
              } else if (result.type === "success") {
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
              <i class="fa-solid fa-box-archive" />
            </button>
          </div>
        </form>
        <!-- Copy slideshow -->
        <form
          method="post"
          action="?/cloneSS"
          use:enhance={({ formData }) => {
            formData.set("slideshow", JSON.stringify(props.slideshow));

            return async ({ result }) => {
              // `result` is an `ActionResult` object
              if (result.type === "failure") {
                // Handle the error
                alert(
                  `Failed to clone slideshow, please reload page (F5).\n${result.data?.error}`,
                );
              } else if (result.type === "success") {
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
              <i class="fa-solid fa-copy" />
            </button>
          </div>
        </form>

        <!-- Delete slideshow -->
        <form
          method="post"
          action="?/deleteSlideshow"
          use:enhance={async ({ formData, cancel }) => {
            // Causes svelte violation warning, because of holdup

            const authToken = getCookie("authToken");
            console.log(authToken);

            let informationData = await fetch(env.PUBLIC_API_URL + "/api/slideshows/"+ slideshowID +"/time_slots", {
              headers: {"Authorization": 'Bearer ' + authToken},
            });
            
            const riskInformation = await informationData.json();

            let names = riskInformation.map((risk) => risk.name);
            let riskString = "";
            if (names.length != 0) {
              riskString =
                "\n\nThe slideshow i part of the following timeslot(s):\n";
              for (let name of names) {
                riskString += name + "\n";
              }
            }

            let confirmation = confirm(
              `Are you sure you want to delete "${props.slideshow.name}"? ${riskString}`,
            );
            if (!confirmation) return cancel();

            formData.set("slideshowID", props.slideshow.id);

            return async ({ result }) => {
              // `result` is an `ActionResult` object
              if (result.type === "failure") {
                // Handle the error
                alert(
                  `Failed to delete slideshow, please reload page (F5).\n${result.data?.error}`,
                );
              } else if (result.type === "success") {
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
      </div>
    </div>
    <!-- For show the display devies -->
    <div class="slideshows-item-header-bottom">
      <i class="fa-solid fa-tower-cell"></i>
      <div class="slideshows-item-live-list">
        {#each props.screens as screenName}
          <div class="slideshows-item-live-screen">{screenName.name}</div>
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
        {#each props.VMIForSS as VMI}
          <Slideshowcontent
            {VMI}
            {slideshowID}
            slideshow={props.slideshow}
            form={props.form}
            updateSlideshowContent={props.updateSlideshowContent}
          />
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
                // Handle the error
                /*alert(
            `Failed to change slide order, please reload page (F5).\n${result.data?.error}`,
          );*/
              } else if (result.type === "success") {
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
    width: auto;
    padding: 4px;
    transition: all 0.05s;

    /*outline: none; /* Disable focus outline */
  }

  .unstyled-input:hover {
    background-color: darkgray;
    cursor: text;
  }
</style>
