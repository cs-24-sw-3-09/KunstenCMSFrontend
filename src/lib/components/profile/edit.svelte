<!-- 
    TODO: Add functionality for edit profile
 -->

<script>
    let { profileData, doEditProfile, doChangePassword} = $props();

    import Button from "$lib/components/button.svelte";
</script>

<div class="profile-info">
    <div class="profile-info-item">
        <div class="profile-info-item-title">Full Name</div>
        <div class="profile-info-item-text">{profileData.firstName} {profileData.lastName}</div>
    </div>
    <div class="profile-info-item">
        <div class="profile-info-item-title">Email</div>
        <div class="profile-info-item-text">{profileData.email}</div>
    </div>
    <div class="profile-info-buttons">
        <!-- <button class="profile-info-edit-button" onclick={doEditProfile}>Edit</button>
        <button class="profile-info-pass-button" onclick={doChangePassword}>Change Password</button> -->
        <Button clickFunction={doEditProfile} text="Edit Profile" />
        <div class="change-password">
            <!-- data-sveltekit-reload allow the browser to handle full-page navigation -->
            <a href="/forgot" data-sveltekit-reload >Change password</a>
        </div>
        <!-- <Button clickFunction={doChangePassword} text="Change Password" /> -->
    </div>
</div>

