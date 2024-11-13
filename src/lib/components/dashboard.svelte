<script>
    import Card from "$lib/components/card.svelte";
    import fallback from "$lib/images/default.png"; // temp image, fallback need to be dynamically changed via data from database

    let { devices } = $props();
    $inspect(devices);
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
