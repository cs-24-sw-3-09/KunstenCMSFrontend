<script>
    import ProfileInfo from "$lib/components/profileInfo.svelte";
    import ProfileEdit from "$lib/components/profileEdit.svelte";
    import ProfileNotis from "$lib/components/ProfileNotis.svelte";

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

    function editProfile() {
        console.log("edit");
    }

    function changePassword() {
        console.log("changePassword");
    }
</script>

<div class="main-content">
    <div class="profile">
        <div class="profile-top">
            <ProfileInfo profileData={userData} />
            <ProfileEdit
                profileData={userData}
                doEditProfile={editProfile}
                doChangePassword={changePassword}
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

<style>
    @import "$lib/styles/checkbox.css";
    @import "$lib/styles/profile.css";
</style>
