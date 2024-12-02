<script>
    let props = $props();

    let content = props.content;



    



</script>

<!---
<ul bind:this={listElement}>
    {#each items as item}
      <li>{item.id}</li>
    {/each}
  </ul>
  -->

<div class="slideshows-item-body">
    <div class="slideshows-body-line"></div>
    <div class="slideshows-body-list">
        <div draggable="true" class="slideshows-body-item">
            <div class="slideshows-body-item-preview">
                <img src={content.visualMedia ? `http://152.53.110.114:8080/files${content.visualMedia.location}` : ''} alt="Media">

            </div>
            <div class="slideshows-body-item-num">
                {content.slideshowPosition}
            </div>
            <div class="slideshows-body-item-title">
                {content.visualMedia ? content.visualMedia.name: "No name"}
            </div>
            <div class="slideshows-body-item-settings">
                <div class="slideshows-body-item-duration">
                    <div class="slideshows-body-item-duration-icon">
                        <i class="fa-regular fa-clock"></i>
                    </div>
                    <div class="slideshows-body-item-duration-title"  >
                        Duration:
                    </div>
                    <div class="slideshows-body-item-duration-input non-draggable">
                        {#if content.visualMedia && (content.visualMedia.fileType == "image/jpeg" || content.visualMedia.fileType == "image/png")}
                        <input type="text" value={content.slideDuration} />
                        {:else}
                        <label for="country"> {(content.visualMedia)?content.slideDuration: 0}:</label>
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
