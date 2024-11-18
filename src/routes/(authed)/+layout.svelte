<script>
    let { children } = $props();
    import logo from "$lib/assets/logo-white.png";

    let largeSidebar = $state(true);

    let adminAuth = $state(true)

    function toggle_sidebar(event) {
        event.preventDefault();
        largeSidebar = !largeSidebar;
    }
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="grid-container">
    <div class={largeSidebar ? "sidebar" : "sidebar sidebar_small"}>
        <a
            href="/dashboard"
            class="sidebar-item sidebar-header tooltippable tooltipText-Kunsten"
        >
            <img src={logo} alt="logo" />
            {#if largeSidebar}
                <p class="sidebar-item-text">Kunsten</p>
            {/if}
        </a>
        <a
            href="/dashboard"
            class="sidebar-item tooltippable tooltipText-Dashboard"
        >
            <i class="fa-solid fa-house"></i>
            {#if largeSidebar}
                <p class="sidebar-item-text">Dashboard</p>
            {/if}
        </a>
        <a
            href="/schedule-week"
            class="sidebar-item tooltippable tooltipText-Schedule"
        >
            <i class="fa-solid fa-calendar-days"></i>
            {#if largeSidebar}
            <p class="sidebar-item-text">Schedule</p>
            {/if}
        </a>
        <a
            href="/slideshows"
            class="sidebar-item tooltippable tooltipText-Slideshows"
        >
            <i class="fa-solid fa-file"></i>
            {#if largeSidebar}
                <p class="sidebar-item-text">Slideshows</p>
            {/if}
        </a>
        <a
            href="/gallery"
            class="sidebar-item tooltippable tooltipText-Gallery"
        >
            <i class="fa-solid fa-images"></i>
            {#if largeSidebar}
                <p class="sidebar-item-text">Gallery</p>
            {/if}
        </a>
        <div class="sidebar-bottom">
            {#if adminAuth}
                <a
                    href="/admin"
                    class="sidebar-item tooltippable tooltipText-Admin"
                >
                    <i class="fa-solid fa-lock"></i>
                    {#if largeSidebar}
                        <p class="sidebar-item-text">Admin</p>
                    {/if}
                </a>
            {/if}
            <a
                href="/profile"
                class="sidebar-item tooltippable tooltipText-User-profile"
            >
                <i class="fa-solid fa-user"></i>
                {#if largeSidebar}
                    <p class="sidebar-item-text">User Profile</p>
                {/if}
            </a>
            <a
                href="/login"
                class="sidebar-item tooltippable tooltipText-Logout"
            >
                <i class="fa-solid fa-right-from-bracket"></i>
                {#if largeSidebar}
                    <p class="sidebar-item-text">Logout</p>
                {/if}
            </a>
        </div>
        <button class="toggle-sidebar-button" onclick={toggle_sidebar}>
            <i class="fa-solid fa-angle-left"></i>
        </button>
    </div>

    <div class={largeSidebar ? "main-content" : "main-content main-content_large"}>
        {@render children()}
    </div>
</div>

<style>
    @import "$lib/styles/tooltip.css";
    @import "$lib/styles/sidebar.css";
</style>
