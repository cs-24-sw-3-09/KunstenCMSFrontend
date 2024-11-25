<script>

    let props = $props();

    console.log(props.screen.name);

    import Content from "./slideshowcontent.svelte"
    


</script>

<div class="slideshows-item active">
    <div class="slideshows-item-header">
      <div class="slideshows-item-header-top">
        <div class="slideshows-item-header-left">
          <div class="slideshows-item-header-arrow">
            <i class="fa-solid fa-caret-right slideshow-arrow"></i>
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
      {#each props.screen.visualMediaInclusionCollection as content}
      
      <Content {content}/>
      {/each}
      <div class="slideshows-body-add">
        <i class="fa-solid fa-plus"></i> Add Media
      </div>
    </div>

</div>


