<script>
    import Card from "./card.svelte";
    import Modal from "./modal.svelte";
    //TODO: use svelte $state
    let { data } = $props(); // imports data from "server"
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
                {#each data.card_data as card}
                    <Card
                        status={card.status}
                        content={card.content || content}
                        location={card.location}
                        title={card.title}
                        title_location={card.title_location}
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
