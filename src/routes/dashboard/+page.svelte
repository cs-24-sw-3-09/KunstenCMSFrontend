<script>
    import Card from "./card.svelte";
    let { data } = $props(); // imports data from server
    //console.log("data",data);
</script>

<div class="grid-container">
    <div class="main-content">
        <h1>Dashboard</h1>
        <p>This is the dashboard page.</p>
        <div class="dashboard-page">
            <div class="dashboard-grid">
                {#each data.card_data as card}
                    <Card file={card.file} location={card.location} title={card.title} title_location={card.title_location}/>
                {/each}
            </div>
        </div>
        <div class="new-device-modal">
            Hello
        </div>
    </div>
</div>

<style>
    @import "./page.css";
    @import "./dashboard.css";
    @import "./tooptip.css";
</style>
