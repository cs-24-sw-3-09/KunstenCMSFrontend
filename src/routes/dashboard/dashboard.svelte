<script>
    import Card from "./card.svelte";

    let { devices } = $props();
    $inspect(devices);
    
    import fallback from "$lib/images/default.png"; // temp image, fallback need to be dynamically changed via data from database

    /* async function fetchData() {
        const response = await fetch('/api/display_devices');
        const data = await response.json();
        deviceStore.set(data);
    }

    setInterval(fetchData, 10000);
    fetchData();  // Initial fetch */

</script>

<!-- <h1>Dashboard</h1> -->
<div class="dashboard-page">
    <div class="dashboard-grid">
        <!-- For each device in the deviceStore, render a Card component -->
        {#each devices as device}
            <Card
                status={device.status}
                content={device.content || fallback}
                title={device.title}
                location={device.location}
                slideshow={device.slideshow}
            />
        {/each}
    </div>
</div>
