<script>
    import Card from "$lib/components/dashboard/card.svelte";
    
    let { admin, devices, doEdit, deleteDevice } = $props();
</script>

<!-- <h1>Dashboard</h1> -->
<div class="dashboard-page">
    <div class="dashboard-grid">
        <!-- For each device in the deviceStore, render a Card component -->
        {#each devices as device}
            <Card admin={admin} device={device} doEdit={() => (doEdit(device))} deleteDevice={deleteDevice} />
        {/each}
    </div>
</div>

