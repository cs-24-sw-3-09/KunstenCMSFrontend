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
            from: "2023-01-01",
            to: "2023-01-31",
        },
    };
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
                <ProfileInfo {profileData} />
                <ProfileEdit {profileData} /> <!-- TODO: Add functionality for edit profile -->
            </div>
            <div class="profile-notis">
                <Notis {profileData} />
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
