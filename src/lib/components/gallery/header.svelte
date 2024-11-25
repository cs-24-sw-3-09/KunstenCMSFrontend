<script>
    let { doToggleNewModal, searchTermUpdate, searchTerm, searchTagsUpdate, searchTags } = $props();
</script>

<div class="gallery-header">
    <button class="gallery-header-upload-button" onclick={doToggleNewModal}>Upload Image</button>
    <input class="gallery-header-input" type="text" placeholder="search title..." value={searchTerm} oninput={searchTermUpdate} />

    <div class="gallery-header-tag-search-container">
        <input type="text" class="gallery-header-tag-input" placeholder="search tag..." value={searchTags} oninput={searchTagsUpdate} />
        <!-- <div class="gallery-header-tag-icon">
            <i class="fa-solid fa-chevron-down"></i>
        </div> -->
    </div>

    <!-- <div class="gallery-header-advanced">
        Advanced filter
        <i class="fa-solid fa-chevron-down"></i>
    </div> -->
</div>