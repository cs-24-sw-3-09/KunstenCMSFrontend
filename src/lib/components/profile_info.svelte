<!-- 
    TODO: Add correct implementation of access text
-->

<script>
    let { profileData } = $props();
</script>

<div class="profile-main">
    <div class="profile-image-container">
        <i class="fa-solid fa-user profile-image"></i>
    </div>
    <div class="profile-main-info">
        <div class="profile-main-name">{profileData.first_name}</div>
        <div class="profile-main-role">{profileData.role}</div>
        {#if profileData.role === "Media Planner"}
            <div class="profile-main-role-text">
                You have access to edit media and create new media
            </div>
        {:else if profileData.role === "admin"}
            <div class="profile-main-role-text">
                You have access to edit media, create new media, manage users and manage devices
            </div>
        {:else}
            <div class="profile-main-role-text">
                You have access to view media
            </div>
        {/if}
    </div>
</div>
