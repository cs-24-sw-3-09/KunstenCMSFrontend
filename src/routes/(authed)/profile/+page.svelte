<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data, form } = $props(); // "form" is automatically populated by SvelteKit

    import ProfileInfo from "$lib/components/profile/info.svelte";
    import ProfileEdit from "$lib/components/profile/edit.svelte";
    import ProfileNotis from "$lib/components/profile/notis.svelte";
    import EditModal from "$lib/components/profile/editmodal.svelte";
    import PasswordModal from "$lib/components/profile/passwordmodal.svelte";
    import SavedPopup from "$lib/components/savedpopup.svelte";

    let profileData = $state(data.user);

    function updateProfileData(data) {
        profileData = data;
    }

    let showEditModal = $state(false);
    let showChangePasswordModal = $state(false);

    function toggleEditModal() {
        showEditModal = !showEditModal;
    }

    function togglePasswordModal() {
        showChangePasswordModal = !showChangePasswordModal;
    }

    let popup;

    function saveData(success) {
    if (success) {
    popup.show("Your changes have been saved!", "success");
    } else {
    popup.show("Failed to save changes!", "error");
    }
    }
</script>

<div class="main-content">
    <div class="profile">
        <div class="profile-top">
            <ProfileInfo profileData={profileData} />
                
            <ProfileEdit profileData={profileData} doEditProfile={toggleEditModal} doChangePassword={togglePasswordModal} />
        </div>
            
        <div class="profile-notis">
            <ProfileNotis profileData={profileData} updateProfileData={updateProfileData} saveData={saveData} />
        </div>
    </div>
</div>

{#if showEditModal}
    <EditModal doClose={toggleEditModal} profileData={profileData} updateProfileData={updateProfileData} saveData={saveData} />
{/if}

{#if showChangePasswordModal}
    <PasswordModal doClose={togglePasswordModal} profileData={profileData} />
{/if}

<SavedPopup bind:this={popup} />

<style>
    @import "$lib/styles/profilecheckbox.css";
    @import "$lib/styles/profile.css";
</style>
