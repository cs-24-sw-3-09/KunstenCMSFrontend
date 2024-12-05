<script>
    let { admin, device, doEdit, deleteDevice } = $props();

    import { enhance } from "$app/forms";
    import { page } from '$app/stores';
    
    import { onMount } from "svelte";
    import { on } from "svelte/events";
    //import Carousel from "svelte-carousel";
    
    import test_fallback from "$lib/assets/default.png"; // temp image, fallback need to be dynamically changed via data from database
    
    let contentType = "visualMedia";
    
    let currentMedia = $derived.by(() => {
        let datetimeNow = new Date();
        let dayOfWeek = datetimeNow.getDay();
        let timeNow = datetimeNow.getHours() * 60 + datetimeNow.getMinutes();

        let live = false;

        // Map days of the week to their corresponding start and end properties
        const dayMap = [
            { start: device.sunday_start, end: device.sunday_end },
            { start: device.monday_start, end: device.monday_end },
            { start: device.tuesday_start, end: device.tuesday_end },
            { start: device.wednesday_start, end: device.wednesday_end },
            { start: device.thursday_start, end: device.thursday_end },
            { start: device.friday_start, end: device.friday_end },
            { start: device.saturday_start, end: device.saturday_end },
        ];

        // Get the relevant start and end times for the current day
        const { start, end } = dayMap[dayOfWeek] || { start: null, end: null };

        // Check if live conditions are met
        // If null, then the device is always live
        if (start !== null && end !== null) {
            live = true;
        // if between start and end, then live
        } else if (timeNow >= start && timeNow <= end) {
            live = true;
        }

         // Check if during timeslot
        // Priority timeslot: is current, shortest timeslot, then lastly the smallest id

        // Helper function to check if a day is relevant for the current day
        const isRelevantForDay = (weekdaysChosen, dayIndex) => { // 0 for Sunday, 1 for Monday, etc.
            return (Number(weekdaysChosen) & (1 << dayIndex)) !== 0; // Check if the bit for the day is set
        };

        let timeslot = null;
        for (let i = 0; i < device.timeSlots.length; i++) {
            const slot = device.timeSlots[i];

            // Parse full start and end times with dates
            const slotStart = new Date(`${slot.startDate}T${slot.startTime}`);
            const slotEnd = new Date(`${slot.endDate}T${slot.endTime}`);

            // Check if today is a relevant day for the timeslot
            if (isRelevantForDay(slot.weekdaysChosen, dayOfWeek)) {
                // Check if the current time is within the timeslot
                if (datetimeNow >= slotStart && datetimeNow <= slotEnd) {
                    // Compare durations and prioritize the shorter timeslot or smaller ID
                    const currentDuration = new Date(timeslot?.endTime) - new Date(timeslot?.startTime);
                    const slotDuration = slotEnd - slotStart;

                    if (!timeslot || // First valid timeslot found
                        slotDuration < currentDuration || // Shorter duration
                        (slotDuration === currentDuration && slot.id < timeslot.id) // Equal duration but smaller ID
                    ) {
                        timeslot = slot; // Set the current timeslot
                    }
                }
            }
        }

        if (timeslot) {
            if (timeslot.displayContent.type == "visualMedia") {
                return {
                    src: timeslot.displayContent.src,
                    type: "visualMedia",
                    title: "Media: " + timeslot.displayContent.name,
                };
            }
            if (timeslot.displayContent.type == "slideshow") {
                return {
                    src: timeslot.displayContent.visualMediaInclusionCollection[0].visualMedia.src,
                    type: "visualMedia",
                    title: "Slideshow: " + timeslot.displayContent.name,
                }
            }
        }




        // Check if fallback content is set
        if (device.fallbackContent.type == "visualMedia") { 
            return {
                src: device.fallbackContent.src, 
                type: "visualMedia", 
                title: "Fallback Media: " + device.fallbackContent.name
            };
        }
        if (device.fallbackContent.type == "slideshow") { 
            return {
                src: device.fallbackContent.visualMediaInclusionCollection[0].visualMedia.src, 
                type: "visualMedia", 
                title: "Fallback Slideshow: " + device.fallbackContent.name
            }
        }
        if (device.fallbackContent == null) { 
            return {
                src: test_fallback, 
                type: "visualMedia", 
                title: "No media"
            }
        }

        return test_fallback;
    });
</script>

<div class="dashboard-card">
    <div class="dashboard-card-top">
        <div class="dashboard-card-preview">
            <img src={currentMedia.src} alt=""/> <!-- TODO: Add slideshow support -->
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
            <div class="dashboard-card-slideshow-title">{currentMedia.title}</div>
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

