<script>
    let { children } = $props();
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

{@render children()}

<style>
    @import "$lib/styles/page.css";
    @import "$lib/styles/tooltip.css";
</style>