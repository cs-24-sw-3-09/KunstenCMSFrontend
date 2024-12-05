<script>
    import "./screen.css";
    import io from "socket.io-client";
    import { Manager } from "./manager.js";
    import { onMount } from "svelte";
    var { data } = $props();

    import { env } from "$env/dynamic/public";

    var carouselItems = $state([]);
    var status = $state(true);
    var currentItem = $state(0);
    var carouselItemsDom;

    onMount(() => {
        const manager = new Manager(io, data.deviceId, data.socketUrl, clearCarouselItems, addCarouselItem, setStatus, setCurrentItem, getCarouselItemsDom, getCurrentItem);
        manager.run();
    })

    var setStatus = (s) => (status = s);
    var clearCarouselItems = () => carouselItems = [];
    var addCarouselItem = (item) => carouselItems.push(item);
    var setCurrentItem = (item) => (currentItem = item);
    var getCurrentItem = () => currentItem;
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
                <img src={env.PUBLIC_API_URL + item.location} alt={item.alt} class:active={i === currentItem} />
            {/if}
            {#if item.fileType.includes("video/")}
                <video muted loop class:active={i === currentItem}>
                    <source src={env.PUBLIC_API_URL + item.location} type={item.fileType} />
                </video>
            {/if}
        {/each}
    </div>
</div>
