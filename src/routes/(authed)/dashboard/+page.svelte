<script>
    /* Importing the components needed for the dashboard page */
    import Button from "$lib/components/button.svelte";
    import Dashboard from "$lib/components/dashboard/dashboard.svelte";
    import NewModal from "$lib/components/dashboard/newmodal.svelte";
    import EditModal from "$lib/components/dashboard/editmodal.svelte";

    import { testDevices } from "$lib/testdata.js";

    let devices = $state([]);
    devices = testDevices;

    // Options for the fallback slideshow dropdown, TODO: Get this from the database
    let options = [
        "Event 2024",
        "Event 2023",
        "Event 2022",
        "Event 2021",
        "Event 2020",
    ];

    // Temp variable to store the device that is being edited, deleted or created
    let deviceFocus = $state({});

    // Controls the visibility of the device creation modal
    let showNewModal = $state(false);
    let showEditModal = $state(false);

    function toggleNewModal(device = deviceFocus) {
        deviceFocus = {};
        console.log(deviceFocus);
        showNewModal = !showNewModal;
        console.log("showNewModal:");
        console.log(showNewModal);
    }

    function toggleEditModal(device = deviceFocus) {
        deviceFocus = device;
        console.log(deviceFocus);
        showEditModal = !showEditModal;
        console.log("showEditModal:");
        console.log(showEditModal);
    }

    function addDevice(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        // TODO

        console.log("Device added:");
        console.log(data);
    }

    function editDevice(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        // TODO

        console.log("Device edited:");
        console.log(data);
    }
</script>

<div class="main-content">
    <div class="page">
        <div class="page-header">
            <h1>Dashboard</h1>
            <Button text={"New Device"} clickFunction={toggleNewModal} />
        </div>
        <Dashboard {devices} doEdit={toggleEditModal} />
    </div>
</div>
{#if showNewModal}
    <NewModal doClose={toggleNewModal} doSubmit={addDevice} {options} />
{/if}
{#if showEditModal}
    <EditModal
        doClose={toggleEditModal}
        doSubmit={editDevice}
        {options}
        device={deviceFocus}
    />
{/if}

<style>
    @import "$lib/styles/dashboard.css";
</style>
