<script>
    let { children } = $props();
    import { page } from "$app/stores";
    import logo from "$lib/assets/logo.ico";

    const title = "Kunsten CMS";
    let subtitle = ($page.url.pathname.split("/").slice(1).toString()[0].toUpperCase() + $page.url.pathname.split("/").slice(1).toString().slice(1)).replace(/_/g, " ").replace(/-/g, " ");
    let pagetitle =  [subtitle, title].filter(Boolean).join(" - ");

    const desctiption = "Content Management System for Kunsten Museum of Modern Art Aalborg";
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
    <link rel="icon" type="image/x-icon" href={logo}>
    <title>{pagetitle}</title>
    <meta name="description" content={desctiption} />
</svelte:head>

{@render children()}

<style>
    @import "$lib/styles/page.css";
</style>