<script>
    let { admin, device, doEdit } = $props();
    import test_fallback from "$lib/assets/default.png"; // temp image, fallback need to be dynamically changed via data from database
</script>

<div class="dashboard-card">
    <div class="dashboard-card-top">
        <div class="dashboard-card-preview">
            <img src={device.fallbackVisualMedia.location !== "" ? device.fallbackVisualMedia.location : test_fallback} alt=""/> <!-- TODO: add dynamic html element for video-->
        </div>
    </div>
    <div class="dashboard-card-bottom">
        <div class="dashboard-card-title">
            {#if device.connectedState == "active"}
                <div class="dashboard-card-slideshow-active tooltippable tooltipText-Active"></div>
            {:else}
                <div class="dashboard-card-slideshow-inactive tooltippable tooltipText-Active"></div>
            {/if}
            <p>{device.name ? device.name : "No name"}</p>
        </div>
        <div class="dashboard-card-slideshow-info">
            <i class="fa-solid fa-file"></i> <!-- spacing -->
            <div class="dashboard-card-slideshow-title">{device.visualMedia ? device.visualMedia : "No media"}</div>
        </div>
        <div class="dashboard-card-location-title">
            <i class="fa-solid fa-location-dot"></i> <!-- spacing -->
            <p>{device.location ? device.location : "No location"}</p>
        </div>
        {#if admin}
            <!-- <div class="dashboard-card-delete tooltippable tooltipText-Delete" onclick={doEdit}>
                <i class="fa-solid fa-trash"></i>
            </div> -->
            <div class="dashboard-card-edit tooltippable tooltipText-Edit" onclick={doEdit}>
                <i class="fa-solid fa-pen-to-square"></i>
            </div>
        {/if}
    </div>
</div>
