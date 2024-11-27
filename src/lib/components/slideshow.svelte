<script>
  let props = $props();


  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();


  import Content from "./slideshowcontent.svelte";

  import { onMount } from "svelte";
  import Sortable from "sortablejs";

  let items = props.screen.visualMediaInclusionCollection;
  let listElement;

  onMount(() => {
    new Sortable(listElement, {
      animation: 150,
      onEnd: (event) => {
        const [movedItem] = items.splice(event.oldIndex, 1);
        items.splice(event.newIndex, 0, movedItem);
      },
    });
  });
</script>

<div class="slideshows-item active">
  <div class="slideshows-item-header">
    <div class="slideshows-item-header-top">
      <div class="slideshows-item-header-left">
        <div class="slideshows-item-header-arrow">
          <button on:click={() => dispatch("update", props.screen.id)}>
            Click me: {props.screen.id}
          </button>
        </div>
        <div
          class="slideshows-item-header-activity tooltippable tooltipText-Active"
        ></div>
        <div class="slideshows-item-header-title">
          {props.screen.name}
        </div>
      </div>
      <div class="slideshows-item-header-right">
        <div class="slideshows-item-header-action">
          <i class="fa-solid fa-eye"></i>
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
        {#each props.screen.Screens as name}
          <div class="slideshows-item-live-screen">{name}</div>
        {/each}
      </div>
    </div>
    <div
      class="slideshow-body-list"
      style="display: {props.selectedId == props.screen.id ? 'block' : 'none'}"
    >
      <div bind:this={listElement} class="drag-delete-me">
        {#each props.screen.visualMediaInclusionCollection as content}
          <Content {content} />
        {/each}
      </div>
      <div class="slideshows-body-add">
        <i class="fa-solid fa-plus"></i> Add Media
      </div>
    </div>
  </div>
</div>
