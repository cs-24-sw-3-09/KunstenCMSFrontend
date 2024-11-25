<script>
    let { item, doClose, onTagSubmit, onTagDelete } = $props();
</script>

<div class="gallery-modal">
    <div class="gallery-modal-content">
        <div class="gallery-modal-img-container">
            <img src={item.image} class="gallery-modal-image" />
        </div>
        <div class="gallery-modal-close" onclick={doClose}>
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </div>
        <div class="gallery-modal-info">
            <div class="gallery-modal-content-left">
                <div class="gallery-modal-title">{item.name}</div>
                <div class="gallery-modal-description">{item.description}</div>
            </div>
            <div class="gallery-modal-content-mid">
                <div>
                    <div class="gallery-content-mid-title">
                        Included in the Slideshows:
                    </div>
                    <div class="gallery-content-mid-list">
                        {#each item.slideshows as slideshow}
                            <div class="gallery-content-mid-list">
                                {slideshow}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="gallery-modal-content-right">
                <div>
                    <div class="gallery-content-right-title">Media Tags:</div>
                    <div class="gallery-modal-tags">
                        {#each item.tags as tag}
                            <div class="gallery-modal-tag">
                                {tag}
                                <i class="fa-solid fa-trash" aria-hidden="true" onclick={() => (onTagDelete(item, tag))}></i>
                            </div>
                        {/each}
                        <div class="gallery-add-tag-button">
                            <!-- <p>Add tag</p> -->
                            <!-- <input placeholder="Enter Tag" hidden="" /> -->
                            <input type="text" placeholder="Enter New Tag" id="newtagid" />
                            <i class="fa-solid fa-plus" aria-hidden="true" onclick={() => (onTagSubmit(item, document.getElementById("newtagid").value))}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
