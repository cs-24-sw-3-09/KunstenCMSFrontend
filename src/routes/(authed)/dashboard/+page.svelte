<script>
    // Export form
    let { form } = $props(); // Is automatically populated by SvelteKit

    /* Importing the components needed for the dashboard page */
    import Button from "$lib/components/button.svelte";
    import Dashboard from "$lib/components/dashboard/dashboard.svelte";
    import NewModal from "$lib/components/dashboard/newmodal.svelte";
    import EditModal from "$lib/components/dashboard/editmodal.svelte";

    let devices = $state([]);
    
    import { testDevices } from "$lib/testdata.js";
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
        showNewModal = !showNewModal;
    }

    function toggleEditModal(device = deviceFocus) {
        deviceFocus = device;
        showEditModal = !showEditModal;
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
    <NewModal doClose={toggleNewModal} options={options} />
{/if}
{#if showEditModal}
    <EditModal doClose={toggleEditModal} options={options} device={deviceFocus}
    />
{/if}

<style>
    @import "$lib/styles/dashboard.css";
</style>
