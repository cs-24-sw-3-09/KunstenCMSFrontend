<script>
    /* Importing the components needed for the dashboard page */
    import Dashboard from "./dashboard.svelte";
    import NewDeviceModal from "./new_device_modal.svelte";

    import { deviceStore } from "$lib/stores.js";

    // Subscribe to the deviceStore and update the devices variable
    let devices = $state([]);
    deviceStore.subscribe((value) => {
        devices = value;
        //$inspect(devices);
    });

    // Controls the visibility of the device creation modal
    let showModal = $state(false);

    function toggleModal() {
        showModal = !showModal;
        console.log("showModal", showModal);
    }

    function addDevice(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        console.log("(Fake) Adding device:", data);

        deviceStore.update((devices) => {
            devices.push({
                title: data.get("name"),
                location: data.get("location"),
                fallback: data.get("fallback"),
                width: data.get("width"),
                height: data.get("height"),
                content: "",
                slideshow: "Event 2024", // TODO: Get this from the database
            });
            return devices;
        });
        
        showModal = !showModal;
        console.log("showModal", showModal);
    }
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="grid-container">
    <div class="main-content">
        <Dashboard devices={devices}/>
        <!-- TODO: Move this to a separate component -->
        <a href="#" class="dashboard-new-button" onclick={toggleModal}>
            <i class="fa-solid fa-circle-plus"></i>
        </a>
    </div>
    {#if showModal}
        <!-- inClose is a callback function that is called when the modal is closed, see new_device_modal.svelte -->
        <NewDeviceModal onClose={toggleModal} onSave={addDevice} />
    {/if}
</div>

<style>
    /* All Styling needed for the dashboard page */
    @import "./page.css";
    @import "./dashboard.css";
    @import "./tooptip.css";
    @import "./model.css";
</style>
