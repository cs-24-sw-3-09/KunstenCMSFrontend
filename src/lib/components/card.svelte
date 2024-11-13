<script>
    /* Importing the props from the Card component */
    let { status, content, location, title, slideshow } = $props();
</script>

<div class="dashboard-card">
    <div class="dashboard-card-top">
        <div class="dashboard-card-preview">
            <img src={content} alt=""/> <!-- TODO: add dynamic html element for video-->
        </div>
    </div>
    <div class="dashboard-card-bottom">
        <div class="dashboard-card-title">
            {#if status == "active"}
                <div class="dashboard-card-slideshow-active tooltippable tooltipText-Active"></div>
            {:else}
                <div class="dashboard-card-slideshow-inactive tooltippable tooltipText-Active"></div>
            {/if}
            <p>{title}</p>
        </div>
        <div class="dashboard-card-slideshow-info">
            <i class="fa-solid fa-file"></i> <!-- spacing -->
            <div class="dashboard-card-slideshow-title">{slideshow}</div>
        </div>
        <div class="dashboard-card-location-title">
            <i class="fa-solid fa-location-dot"></i> <!-- spacing -->
            <p>{location}</p>
        </div>
        <div class="dashboard-card-edit tooltippable tooltipText-Edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </div>
    </div>
</div>
