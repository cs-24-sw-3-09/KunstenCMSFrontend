<script>
    import { onMount } from "svelte";
    import { io, Manager } from "socket.io-client";
    import { env } from "$env/dynamic/public";
    import SavedPopup from "$lib/components/savedpopup.svelte";

    /** @type {{ data: import('./$types').PageData }} */
    let { data, form } = $props(); // "form" is automatically populated by SvelteKit

    /* Importing the components needed for the dashboard page */
    import Button from "$lib/components/button.svelte";
    import Dashboard from "$lib/components/dashboard/dashboard.svelte";
    import NewModal from "$lib/components/dashboard/newmodal.svelte";
    import EditModal from "$lib/components/dashboard/editmodal.svelte";

    let devices = $state(data.displayDevices);
    let livedevicedata = $state({});
    //$inspect(devices);

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

    onMount(() => {
        const socket = io(env.PUBLIC_SOCKET_URL);

        socket.on("changeContent", (livedata) => {
            let { deviceid } = livedata;
            livedevicedata[deviceid] = livedata;
        });
    })

    let popup;

    function saveData(success) {
    if (success) {
    popup.show("Your changes have been saved!", "success");
    } else {
    popup.show("Failed to save changes!", "error");
    }
    }

</script>

<div class="main-content">
    <div class="page">
        <div class="dashboard-header">
            <h1>Dashboard</h1>
            <SavedPopup bind:this={popup} />
            {#if data.user.admin}
                <Button text={"New Device"} clickFunction={toggleNewModal} />
            {/if}
        </div>
        <Dashboard admin={data.user.admin} devices={devices} {livedevicedata} doEdit={toggleEditModal} deleteDevice={deleteDevice} />
    </div>
</div>
{#if showNewModal}
    <NewModal doClose={toggleNewModal} createDevice={createDevice} saveData={saveData} />
{/if}
{#if showEditModal}
    <EditModal doClose={toggleEditModal} device={deviceFocus} updateDevices={updateDevices} saveData={saveData} />
{/if}

<style>
    @import "$lib/styles/dashboard.css";
    @import "$lib/styles/editDeviceModal.css";
    
</style>
