<!-- 
    TODO: Add functionality for edit profile
 -->

<script>
    let { profileData, doEditProfile, doChangePassword} = $props();
</script>

<div class="profile-info">
    <div class="profile-info-item">
        <div class="profile-info-item-title">Full Name</div>
        <div class="profile-info-item-text">{profileData.first_name} {profileData.last_name}</div>
    </div>
    <div class="profile-info-item">
        <div class="profile-info-item-title">Email</div>
        <div class="profile-info-item-text">{profileData.email}</div>
    </div>
    <div class="profile-info-buttons">
        <button class="profile-info-edit-button" onclick={doEditProfile}>Edit</button>
        <button class="profile-info-pass-button" onclick={doChangePassword}>Change Password</button>
    </div>
</div>
