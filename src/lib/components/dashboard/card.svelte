<script>
    let { admin, device, doEdit, deleteDevice } = $props();
    import test_fallback from "$lib/assets/default.png"; // temp image, fallback need to be dynamically changed via data from database

    import { enhance } from "$app/forms";
</script>

<div class="dashboard-card">
    <div class="dashboard-card-top">
        <div class="dashboard-card-preview">
            <img src={test_fallback} alt=""/> <!-- TODO: add dynamic html element for video-->
        </div>
    </div>
    <div class="dashboard-card-bottom">
        <div class="dashboard-card-title">
            <!-- {#if device.connectedState == "active"}
                <div class="dashboard-card-slideshow-active tooltippable tooltipText-Active"></div>
            {:else}
                <div class="dashboard-card-slideshow-inactive tooltippable tooltipText-Active"></div>
            {/if} -->
            <p>{device.name ? device.name : "No name"}</p>
        </div>
        <!-- TODO: If during timeslot, else fallbackcontent -->
        <div class="dashboard-card-slideshow-info">
            <i class="fa-solid fa-file"></i>
            <div class="dashboard-card-slideshow-title">MEDIA TODO</div>
        </div>
        <div class="dashboard-card-location-title">
            <i class="fa-solid fa-location-dot"></i> <!-- spacing -->
            <p>{device.location ? device.location : "No location"}</p>
        </div>
        <div class="dashboard-card-slideshow-info">
            <i class="fa-solid fa-external-link-square"></i>
            <div class="dashboard-card-slideshow-title">{"/screen/"+device.id}</div>
        </div>
        

        {#if admin}
            <div class="dashboard-card-edit tooltippable tooltipText-Edit" onclick={doEdit}>
                <i class="fa-solid fa-pen-to-square"></i>
            </div>

            <form method="POST" action="?/deleteDevice"
            use:enhance={ ( { formData }) => {
                formData.set("id", device.id);
                
                return async ({ result }) => {
                    switch (result.type) {
                        case "failure":
                            alert(`Failed to delete display device, please reload page (F5).\n${result.data?.error}`);
                            break;
                        case "success":
                            deleteDevice(device.id);
                            break;
                    }
                };
            }}>
                <div class="dashboard-card-delete tooltippable tooltipText-Delete" 
                onclick={(event) => {
                    // Traverse up DOM and find the closest form ancestor, because div is not a form control
                    // A bit hacky, but it is a holdover from the prototype
                    const form = event.target.closest('form');
                    if (form) form.requestSubmit();
                }}>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </form>
        {/if}
    </div>
</div>

