<script>
    /* Importing the components needed for the dashboard page */
    import Dashboard from "$lib/components/dashboard.svelte";
    import Button from "$lib/components/button.svelte";
    import NewModal from "$lib/components/dashboardNew.svelte";
    import EditModal from "$lib/components/dashboardEdit.svelte";

    import { deviceStore } from "$lib/stores/deviceStore.js";

    // Subscribe to the deviceStore and update the devices variable
    let devices = $state([]);
    deviceStore.subscribe((value) => {
        devices = value;
        //$inspect(devices);
    });

    // Options for the fallback slideshow dropdown, TODO: Get this from the database
    let options = ["Event 2024", "Event 2023", "Event 2022", "Event 2021", "Event 2020"];

    // Temp variable to store the device that is being edited, deleted or created
    let deviceFocus = $state({});

    // Controls the visibility of the device creation modal
    let showNewModal = $state(false);
    let showEditModal = $state(false);

    function toggleNewModal(device=deviceFocus) {
        deviceFocus = device;
        showNewModal = !showNewModal;
        console.log("showNewModal:");
        console.log(showNewModal);
    }

    function toggleEditModal(device=deviceFocus) {
        deviceFocus = device;
        showEditModal = !showEditModal;
        console.log("showEditModal:");
        console.log(showEditModal);
    }

    function addDevice(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

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
        
        console.log("Device added:");
        console.log(data);
    }

    function editDevice(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        console.log("Device edited:");
        console.log(data);
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
        <div class="page-header">
            <h1>Dashboard</h1>
            <!-- <Button text={"New Device"} clickFunction={toggleNewModal} /> -->
        </div>
        
        <Dashboard devices={devices} doEdit={toggleEditModal}  />
        
        <!-- TODO: Move this to a separate component -->
        <a href="#" class="dashboard-new-button" onclick={toggleNewModal}>
            <i class="fa-solid fa-circle-plus"></i>
        </a>
    </div>
    {#if showNewModal}
        <NewModal doClose={toggleNewModal} doSubmit={addDevice} options={options} />
    {/if}
    {#if showEditModal}
        <EditModal doClose={toggleEditModal} doSubmit={editDevice} options={options} device={deviceFocus} />
    {/if}
</div>

<style>
    /* All Styling needed for the dashboard page */
    @import "$lib/styles/page.css";
    @import "$lib/styles/dashboard.css";
    @import "$lib/styles/tooltip.css";
    @import "$lib/styles/dashboardModal.css";
</style>
