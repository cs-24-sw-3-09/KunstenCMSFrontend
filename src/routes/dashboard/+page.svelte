<script>
    import Card from "./card.svelte";
    import Modal from "./modal.svelte";
    
    import { deviceStore } from "$lib/stores.js";

    let devices;
    deviceStore.subscribe(value => {
        devices = value;
    });
    console.log(devices);

    import content from "$lib/images/default.png"; // temp image
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="grid-container">
    <div class="main-content">
        <h1>Dashboard</h1>
        <p>This is the dashboard page.</p>
        <div class="dashboard-page">
            <div class="dashboard-grid">
                {#each devices as device}
                    <Card
                        status={device.status}
                        content={device.content || content}
                        location={device.location}
                        title={device.title}
                        title_location={device.title_location}
                    />
                {/each}
            </div>
        </div>
        <div class="new-device-modal">
            <Modal />
        </div>
    </div>
</div>

<style>
    @import "./page.css";
    @import "./dashboard.css";
    @import "./tooptip.css";
</style>
