<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data, form } = $props(); // "form" is automatically populated by SvelteKit

    import ProfileInfo from "$lib/components/profile/info.svelte";
    import ProfileEdit from "$lib/components/profile/edit.svelte";
    import ProfileNotis from "$lib/components/profile/notis.svelte";
    import EditModal from "$lib/components/profile/editmodal.svelte";
    import PasswordModal from "$lib/components/profile/passwordmodal.svelte";

    let userData = $state(data.user);

    // Callback function for updating checkbox state
    function updateNotificationState(state) {
        userData.notificationState = state;
    }

    let showEditModal = $state(false);
    let showChangePasswordModal = $state(false);

    function toggleEditModal() {
        showEditModal = !showEditModal;
    }

    function togglePasswordModal() {
        showChangePasswordModal = !showChangePasswordModal;
    }
</script>

<div class="main-content">
    <div class="profile">
        <div class="profile-top">
            <ProfileInfo
                profileData={userData}
                />
                
                <ProfileEdit
                profileData={userData}
                doEditProfile={toggleEditModal}
                doChangePassword={togglePasswordModal}
                />
            </div>
            
            <div class="profile-notis">
                <ProfileNotis
                profileData={userData}
                onUpdateNotificationState={updateNotificationState}
            />
        </div>
    </div>
</div>

{#if showEditModal}
    <EditModal doClose={toggleEditModal} profileData={userData} />
{/if}

{#if showChangePasswordModal}
    <PasswordModal doClose={togglePasswordModal} profileData={userData} />
{/if}

<style>
    @import "$lib/styles/profilecheckbox.css";
    @import "$lib/styles/profile.css";
</style>
