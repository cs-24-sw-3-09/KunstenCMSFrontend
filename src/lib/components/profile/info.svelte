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
        <div class="profile-main-name">{profileData.firstName}</div>
        <div class="profile-main-role">
            {#if profileData.mediaPlanner === true && profileData.admin === true}
                Admin & Media Planner
            {:else if profileData.admin === true}
                Admin
            {:else if profileData.mediaPlanner === true}
                Media Planner
            {:else}
                User
            {/if}
        </div>
        {#if profileData.admin === true && profileData.mediaPlanner === true}
            <div class="profile-main-role-text">
                You have access to edit media, create new media, manage users
                and manage devices
            </div>
        {:else if profileData.admin === true}
            <div class="profile-main-role-text">
                You have access to edit media, create new media, manage users
                and manage devices
            </div>
        {:else if profileData.mediaPlanner === true}
            <div class="profile-main-role-text">
                You have access to edit media and create new media
            </div>
        {:else}
            <div class="profile-main-role-text">
                You have no special permissions
            </div>
        {/if}
    </div>
</div>
