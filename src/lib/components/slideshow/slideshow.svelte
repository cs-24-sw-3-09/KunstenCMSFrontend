<script>
  //on:click={() => dispatch("archived", props.slideshow.isArchived)}
  let props = $props();

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import Content from "./slideshowcontent.svelte";
  import AddMedia from "./addMediaModal.svelte";
  import Button from "$lib/components/modal/button.svelte";
  import { enhance } from "$app/forms";

  import { onMount } from "svelte";
  import Sortable from "sortablejs";

  let items = props.slideshow.visualMediaInclusionCollection;
  let listElement;

  onMount(() => {
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

        dispatch("updateOrder", items);
        console.log(items);
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
    Item={props.filteredData}
    searchTerm={props.searchTerm}
    searchTags={props.searchTags}
    searchTermUpdate={props.searchTermUpdate}
    searchTagsUpdate={props.searchTagsUpdate}
    {slideshowID}
    Items={items}
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
          <i class="fa-soild slideshow-arrow fa-caret down" aria-hidden="true">
          </i>
        </div>
        <div
          class="slideshows-item-header-activity tooltippable tooltipText-Active"
        ></div>
        <div class="slideshows-item-header-title">
          {props.slideshow.name}
        </div>
      </div>

      <div class="slideshows-item-header-right">
        <div class="slideshows-item-header-action" aria-hidden="true">
          <i
            class="fa-solid fa-eye"
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
        <!-- Copy slidehow -->
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
              <i class="fa-solid fa-copy" />
            </button>
          </div>
        </form>

        <!-- Delete slideshow -->
        <form
          method="post"
          action="?/deleteSlideshow"
          use:enhance={({ formData }) => {
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
    <div class="slideshows-item-header-bottom">
      <i class="fa-solid fa-tower-cell"></i>
      <div class="slideshows-item-live-list">
        {#each props.slideshow.Screens as name}
          <div class="slideshows-item-live-screen">{name}</div>
        {/each}
      </div>
    </div>
    <div
      class="slideshow-body-list"
      style="display: {props.selectedId == props.slideshow.id
        ? 'block'
        : 'none'}"
    >
      <div bind:this={listElement} class="drag-delete-me">
        {#each props.slideshow.visualMediaInclusionCollection as content}
          <Content {content} {slideshowID} />
        {/each}
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore event_directive_deprecated -->
      <div class="slideshows-body-add" on:click={toggleAddMediaModal}>
        <i class="fa-solid fa-plus"></i> Add Media
      </div>
    </div>
  </div>
</div>
