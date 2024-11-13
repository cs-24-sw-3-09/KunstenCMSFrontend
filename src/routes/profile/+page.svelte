<!-- 
    TODO:
    - Add functionality for edit profile
    - Correct updating to database
 -->

<script>
    import ProfileInfo from "./profile_info.svelte";
    import ProfileEdit from "./profile_edit.svelte";
    import Notis from "./notis.svelte";

    let profileData = $state([]);
    /* profileStore.subscribe((value) => {
        profileData = value;
        //$inspect(profileData);
    }); */

    profileData = {
        first_name: "Søren",
        last_name: "Sørensen",
        email: "Søren0120@gmail.com",
        role: "Media Planner",
        notifications: true,
        pause_notifications: {
            from: "2024-11-01",
            to: "2024-11-30",
        },
    };

    function toggleNotifications() {
        profileData.notifications = !profileData.notifications;
        console.log("Notifications toggled:", profileData.notifications); 
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
                <ProfileInfo profileData={profileData} />
                <ProfileEdit profileData={profileData} doEditProfile={editProfile} doChangePassword={changePassword} /> <!-- TODO: Add functionality for edit profile -->
            </div>
            <div class="profile-notis">
                <Notis {profileData} doToggleNotifications={toggleNotifications} doPauseNotifications={pauseNotifications}/>
            </div>
        </div>
    </div>
</div>

<style>
    @import "./page.css";
    @import "./profile.css";
    @import "./checkbox.css";
    @import "./tooltip.css";
</style>
