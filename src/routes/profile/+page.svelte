<!-- 
    TODO:
    - Add functionality for edit profile
    - Correct updating to database
 -->

<script>
    import ProfileInfo from "$lib/components/profile_info.svelte";
    import ProfileEdit from "$lib/components/profile_edit.svelte";
    import Notis from "$lib/components/notis.svelte";

    import { userStore } from "$lib/stores/userStore.js";

    let userData = $state([]);
    userStore.subscribe((value) => {
        userData = value;
        //$inspect(profileData);
    });

    // Temp function for testing purposes

    function toggleNotifications() {
        userData.notifications = !userData.notifications;
        console.log("Notifications toggled:", userData.notifications); 
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

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="grid-container">
    <div class="main-content">
        <div class="profile">
            <div class="profile-top">
                <ProfileInfo profileData={userData} />
                <ProfileEdit profileData={userData} doEditProfile={editProfile} doChangePassword={changePassword} /> <!-- TODO: Add functionality for edit profile -->
            </div>
            <div class="profile-notis">
                <Notis profileData={userData} doToggleNotifications={toggleNotifications} doPauseNotifications={pauseNotifications}/>
            </div>
        </div>
    </div>
</div>

<style>
    @import "$lib/styles/page.css";
    @import "$lib/styles/profile.css";
    @import "$lib/styles/checkbox.css";
    @import "$lib/styles/tooltip.css";
</style>
