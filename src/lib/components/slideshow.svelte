<script>
  let props = $props();

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import Content from "./slideshowcontent.svelte";
  import AddMedia from "$lib/components/addMediaModal.svelte";

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
</script>

{#if showAddMediaModal}
  <AddMedia
    doClose={toggleAddMediaModal}
    Item={props.filteredData}
    searchTerm={props.searchTerm}
    searchTags={props.searchTags}
    searchTermUpdate={props.searchTermUpdate}
    searchTagsUpdate={props.searchTagsUpdate}
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
        <div class="slideshows-item-header-action">
          <i class="fa-solid fa-box-archive"></i>
        </div>
        <div class="slideshows-item-header-action">
          <i class="fa-solid fa-copy"></i>
        </div>
        <div class="slideshows-item-header-action">
          <i class="fa-solid fa-trash"></i>
        </div>
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
          <Content {content} />
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
