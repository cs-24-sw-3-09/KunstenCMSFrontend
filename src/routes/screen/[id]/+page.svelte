<script>
    import "./screen.css";
    import io from "socket.io-client";
    import { Manager } from "./manager.js";
    import { onMount } from "svelte";
    import { env } from "$env/dynamic/public";

    var { data } = $props();
    var carouselItems = $state([]);
    var status = $state(true);
    var currentItemIndex = $state(0);
    var carouselItemsDom;

    onMount(() => {
        try {
            let deviceId = parseInt(data.deviceId);
            const manager = new Manager(io, deviceId, env.PUBLIC_SOCKET_URL, clearCarouselItems, addCarouselItem, setStatus, setCurrentItemIndex, getCarouselItemsDom, getCurrentItemIndex, getItems);
            manager.run();
        } catch(e) {}
    })

    var setStatus = (s) => (status = s);
    var clearCarouselItems = () => carouselItems = [];
    var addCarouselItem = (item) => carouselItems.push(item);
    var setCurrentItemIndex = (item) => (currentItemIndex = item);
    var getCurrentItemIndex = () => currentItemIndex;
    var getItems = () => carouselItems.map((item) => ({url: item.location, type: item.type}));
    var getCarouselItemsDom = () => carouselItemsDom;
</script>

<svelte:head>
    <title>Screen {data.deviceId}</title>
</svelte:head>

{#if status}
    <p id="status">Connecting with device id: {data.deviceId}</p>
{/if}
<div class="carousel">
    <div class="carousel-items" id="carousel-items" bind:this={carouselItemsDom}>
        {#each carouselItems as item, i}
            {#if item.fileType.includes("image/")}
                <!-- svelte-ignore a11y_missing_attribute -->
                <img src={env.PUBLIC_API_URL + item.location} class:active={i === currentItemIndex} />
            {/if}
            {#if item.fileType.includes("video/")}
                <video muted loop class:active={i === currentItemIndex}>
                    <source src={env.PUBLIC_API_URL + item.location} type={item.fileType} />
                </video>
            {/if}
        {/each}
    </div>
</div>
