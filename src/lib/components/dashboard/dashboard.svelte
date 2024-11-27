<script>
    import Card from "$lib/components/dashboard/card.svelte";
    

    let { devices, doEdit } = $props();
    $inspect(devices);
</script>

<!-- <h1>Dashboard</h1> -->
<div class="dashboard-page">
    <div class="dashboard-grid">
        <!-- For each device in the deviceStore, render a Card component -->
        {#each devices as device}
            <Card
                device={device}
                doEdit={() => (doEdit(device))}
            />
        {/each}
    </div>
</div>

