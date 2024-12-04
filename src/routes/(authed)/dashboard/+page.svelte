<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data, form } = $props(); // "form" is automatically populated by SvelteKit

    /* Importing the components needed for the dashboard page */
    import Button from "$lib/components/button.svelte";
    import Dashboard from "$lib/components/dashboard/dashboard.svelte";
    import NewModal from "$lib/components/dashboard/newmodal.svelte";
    import EditModal from "$lib/components/dashboard/editmodal.svelte";

    let devices = $state(data.displayDevices.content);

    function updateDevices(updatedDevice) {
        const index = devices.findIndex((device) => device.id === updatedDevice.id);
        if (index !== -1) {
            devices[index] = updatedDevice;
        }
    }

    function createDevice(newDevice) {
        devices = [...devices, newDevice];
    }
    7
    function deleteDevice(id) {
        let index = -1;
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].id == id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            devices.splice(index, 1);
        }
    }
    
    
    let options = $state(data.fallbackContent);

    // Test data
    /* import { testDevices } from "$lib/testdata.js";
    devices = testDevices; */


    // Temp variable to store the device that is being edited, deleted or created
    let deviceFocus = $state({});

    // Controls the visibility of the device creation modal
    let showNewModal = $state(false);
    let showEditModal = $state(false);

    function toggleNewModal() {
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
            {#if data.user.admin}
                <Button text={"New Device"} clickFunction={toggleNewModal} />
            {/if}
        </div>
        <Dashboard admin={data.user.admin} devices={devices} doEdit={toggleEditModal} deleteDevice={deleteDevice} />
    </div>
</div>
{#if showNewModal}
    <NewModal doClose={toggleNewModal} options={options} createDevice={createDevice} />
{/if}
{#if showEditModal}
    <EditModal doClose={toggleEditModal} options={options} device={deviceFocus} updateDevices={updateDevices} />
{/if}

<style>
    @import "$lib/styles/dashboard.css";
</style>
