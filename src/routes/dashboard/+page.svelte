<script>
    /* Importing the components needed for the dashboard page */
    import Dashboard from "./dashboard.svelte";
    import NewDeviceModal from "./new_device_modal.svelte";

    // Controls the visibility of the device creation modal
    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
        console.log(showModal);
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
        <Dashboard />
        <!-- TODO: Move this to a separate component -->
        <a href="#" class="dashboard-new-button" onclick={toggleModal}>
            <i class="fa-solid fa-circle-plus"></i>
        </a>
    </div>
    {#if showModal}
        <!-- inClose is a callback function that is called when the modal is closed, see new_device_modal.svelte -->
        <NewDeviceModal onClose={toggleModal} />
    {/if}
</div>

<style>
    /* All Styling needed for the dashboard page */
    @import "./page.css";
    @import "./dashboard.css";
    @import "./tooptip.css";
    @import "./model.css";
</style>
