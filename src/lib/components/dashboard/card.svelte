<script>
    let { admin, device, doEdit, deleteDevice } = $props();

    import { enhance } from "$app/forms";
    import { page } from '$app/stores';
    
    import { onMount } from "svelte";
    import { on } from "svelte/events";
    
    import test_fallback from "$lib/assets/default.png"; // temp image, fallback need to be dynamically changed via data from database
    
    
    let currentMedia = $derived.by(() => {
        let datetimeNow = new Date();
        let dayOfWeek = datetimeNow.getDay();
        let timeNow = datetimeNow.getHours() * 60 + datetimeNow.getMinutes();

        console.log(device);

        // Check if on hours
        switch (dayOfWeek) {
            case 0: // Sunday
                if (device.sunday_start==null && device.sunday_end==null) {}
                break;
            case 1: // Monday
                if (device.monday_start==null && device.monday_end==null) {}
                break;
            case 2: // Tuesday
                if (device.tuesday_start==null && device.tuesday_end==null) {}
                break;
            case 3: // Wednesday
                if (device.wednesday_start==null && device.wednesday_end==null) {}
                break;
            case 4: // Thursday
                if (device.thursday_start==null && device.thursday_end==null) {}
                break;
            case 5: // Friday
                if (device.friday_start==null && device.friday_end==null) {}
                break;
            case 6: // Saturday
                if (device.saturday_start==null && device.saturday_end==null) {}
                break;
            default:
                return test_fallback;
        }

        // Check if during timeslot

        /* TODO */


        // Check if fallback content is set
        if (device.fallbackContent.type == "visualMedia") { 
            return device.fallbackContent.src;
        }
        if (device.fallbackContent.type == "slideshow") { 
            return test_fallback; 
        }
        if (device.fallbackContent == null) { 
            return test_fallback; 
        }

        return test_fallback;
    });

    let currentTitle = $derived.by(() => {
        let datetimeNow = new Date();
        let dayOfWeek = datetimeNow.getDay();
        let timeNow = datetimeNow.getHours() * 60 + datetimeNow.getMinutes();

        // Check if on hours
        switch (dayOfWeek) {
            case 0: // Sunday
                if (device.sunday_start==null && device.sunday_end==null) {}
                break;
            case 1: // Monday
                if (device.monday_start==null && device.monday_end==null) {}
                break;
            case 2: // Tuesday
                if (device.tuesday_start==null && device.tuesday_end==null) {}
                break;
            case 3: // Wednesday
                if (device.wednesday_start==null && device.wednesday_end==null) {}
                break;
            case 4: // Thursday
                if (device.thursday_start==null && device.thursday_end==null) {}
                break;
            case 5: // Friday
                if (device.friday_start==null && device.friday_end==null) {}
                break;
            case 6: // Saturday
                if (device.saturday_start==null && device.saturday_end==null) {}
                break;
            default:
                return "No media";
        }

        // Check if during timeslot

        /* TODO */



        // Check if fallback content is set
        if (device.fallbackContent.type == "visualMedia") { 
            return "Fallback Media: "+device.fallbackContent.name;
        }
        if (device.fallbackContent.type == "slideshow") { 
            return "Fallback Slideshow: "+device.fallbackContent.name; 
        }
        if (device.fallbackContent == null) { 
            return "No media"; 
        }

        return "No media";
    });

</script>

<div class="dashboard-card">
    <div class="dashboard-card-top">
        <div class="dashboard-card-preview">
            <img src={currentMedia} alt=""/> <!-- TODO: add dynamic html element for slideshow and video-->
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
            <div class="dashboard-card-slideshow-title">{currentTitle}</div>
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

