<script>
    let { admin, device, doEdit, deleteDevice, livedata } = $props();

    import { enhance } from "$app/forms";
    import { page } from '$app/stores';

    import { env } from "$env/dynamic/public";
   
    import { onMount } from "svelte";
    import { on } from "svelte/events";
    //import Carousel from "svelte-carousel";
    import { getCookie } from "$lib/utils/getcookie.js";
    import loading_image from "$lib/assets/default.png"; // temp image, fallback need to be dynamically changed via data from database
  import { Tooltip } from "@svelte-plugins/tooltips";
  import SavedPopup from "$lib/components/savedpopup.svelte";

  let popup;

    function saveData(success) {
    if (success) {
    popup.show("Your changes have been saved!", "success");
    } else {
    popup.show("Failed to save changes!", "error");
    }
    }
   
</script>

<div class="dashboard-card">
    <div class="dashboard-card-top">
        <div class="dashboard-card-preview">
            {#each livedata?.medias as media, index}
                <img src={env.PUBLIC_API_URL + media.url.replaceAll(".mp4", ".png")} loading="lazy" alt="" class:hidden={index!=livedata?.current} />
            {/each}
        </div>
    </div>
    <div class="dashboard-card-bottom">
        <div class="dashboard-card-title">
            {#if livedata}
            <Tooltip content="Active" animation="slide",  position="top">
                <div class="dashboard-card-slideshow-active tooltippable tooltipText-Active"></div>
            </Tooltip>
            {:else}
            <Tooltip content="Inactive" animation="slide",  position="top">
                <div class="dashboard-card-slideshow-inactive tooltippable tooltipText-Inactive"></div>
            </Tooltip>
            {/if}
            <p>{device?.name ?? "Unknown name"}</p>
        </div>
        <!-- TODO: If during timeslot, else fallbackcontent -->
         
            <div class="dashboard-card-slideshow-info">
                <Tooltip content="Content" animation="slide",  position="top">
                    <i class="fa-solid fa-file"></i>
                </Tooltip>
                <div class="dashboard-card-slideshow-title">{livedata?.contentname ?? "Loading..."}</div>
            </div>
            <div class="dashboard-card-location-title">
                <Tooltip content="Location" animation="slide",  position="top">
                    <i class="fa-solid fa-location-dot"></i> <!-- spacing -->
                </Tooltip>
                <SavedPopup bind:this={popup} />
                <p>{device.location ? device.location : "No location"}</p>
            </div>
        <div class="dashboard-card-slideshow-info">
                <Tooltip content="Screen Path" animation="slide",  position="top">
                    <i class="fa-solid fa-external-link-square"></i>
                </Tooltip>
            <div class="dashboard-card-slideshow-title">{"/screen.html?id="+device.id}</div>
        </div>
        

        {#if admin}
            <div class="dashboard-card-edit tooltippable tooltipText-Edit" onclick={doEdit}>
                <div>
                <Tooltip content="Edit" animation="slide",  position="top">
                <i class="fa-solid fa-pen-to-square"></i>
                </Tooltip>
            </div>
            </div>

            <form method="POST" action="?/deleteDevice"
            use:enhance={ async ( { formData }) => {
                formData.set("id", device.id);
                const authToken = getCookie("authToken");

                let informationDataTimeSlot = await fetch(env.PUBLIC_API_URL + "/api/display_devices/"+ device.id +"/time_slots", {
                headers: {"Authorization": 'Bearer ' + authToken},
                });
                let riskString = "";
                const riskInformationTimeSlot = await informationDataTimeSlot.json();
                if (riskInformationTimeSlot.length != 0) {
                riskString +=
                    "\n\nThe display device is part of the following timeslot(s):\n"+riskInformationTimeSlot.map((risk) => risk.name).join("\n")
                    + "\n \nNOTE: If the display device is deleted, all associated timeslots will also be deleted";
                }

                let confirmation = confirm(
                        `Are you sure you want to delete "${device.name}" screen? ${riskString}`,
                    );
                    if (!confirmation) return cancel();

                return async ({ result }) => {
                    switch (result.type) {
                        case "failure":
                            alert(`Failed to delete display device, please reload page (F5).\n${result.data?.error}`);
                            saveData(false);
                            break;
                        case "success":
                            saveData(true);
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
                <div>
                <Tooltip content="Delete" animation="slide",  position="top">
                    <i class="fa-solid fa-trash"></i>
                </Tooltip></div>
            </div>
            </form>
        {/if}
    </div>
</div>

<style>
    .hidden {
        display: none;
    }
</style>