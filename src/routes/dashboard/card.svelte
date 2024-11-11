<script>
    let { content, location, title, title_location } = $props();
</script>

<div class="dashboard-card">
    <div class="dashboard-card-top">
        <div class="dashboard-card-preview">
            <img src={content} alt="" id="dashboard-card-preview-image1" />
        </div>
    </div>
    <div class="dashboard-card-bottom">
        <div class="dashboard-card-title">
            <div
                class="dashboard-card-slideshow-active tooltippable tooltipText-Active"
            ></div>
            <p>{location}</p>
        </div>
        <div class="dashboard-card-slideshow-info">
            <i class="fa-solid fa-file"></i>
            <div class="dashboard-card-slideshow-title">{title}</div>
        </div>
        <div class="dashboard-card-location-title">
            <i class="fa-solid fa-location-dot"></i>
            <p>{title_location}</p>
        </div>
        <div class="dashboard-card-edit tooltippable tooltipText-Edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </div>
    </div>
</div>
