<script>
    import ProfileInfo from "$lib/components/profileInfo.svelte";
    import ProfileEdit from "$lib/components/profileEdit.svelte";
    import ProfileNotis from "$lib/components/ProfileNotis.svelte";
    import EditModal from "$lib/components/profileEditModal.svelte";
    import PasswordModal from "$lib/components/profilePasswordModal.svelte";

    import { testUser } from "$lib/testdata.js";

    let userData = $state([]);
    userData = testUser;

    function toggleNotifications() {
        userData.notificationState = !userData.notificationState;
        console.log("notificationState toggled:", userData.notificationState);
    }

    function pauseNotifications(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        console.log(data);
    }

    let showEditModal = $state(false);
    let showChangePasswordModal = $state(false);

    function toggleEditModal() {
        showEditModal = !showEditModal; 
    }

    function togglePasswordModal() {
        showChangePasswordModal = !showChangePasswordModal;
    }

    function save(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        console.log("Save User");
        console.log(data);

        toggleEditModal();
    }

    function changePassword(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        console.log("Change Password");
        console.log(data, data.get("password") === data.get("confpassword"));
        
        if (data.get("password") === data.get("confpassword")) {
            togglePasswordModal();
        }
    }
</script>

<div class="main-content">
    <div class="profile">
        <div class="profile-top">
            <ProfileInfo profileData={userData} />
            <ProfileEdit
                profileData={userData}
                doEditProfile={toggleEditModal}
                doChangePassword={togglePasswordModal}
            />
            <!-- TODO: Add functionality for edit profile -->
        </div>
        <div class="profile-notis">
            <ProfileNotis
                profileData={userData}
                doToggleNotifications={toggleNotifications}
                doPauseNotifications={pauseNotifications}
            />
        </div>
    </div>
</div>

{#if showEditModal}
    <EditModal doClose={toggleEditModal} doSubmit={save} user={userData} />
{/if}

{#if showChangePasswordModal}
    <PasswordModal doClose={togglePasswordModal} doSubmit={changePassword} />
{/if}

<style>
    @import "$lib/styles/checkbox.css";
    @import "$lib/styles/profile.css";
</style>
