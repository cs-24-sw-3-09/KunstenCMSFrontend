<!-- 
    TODO: Add functionality for editing notifications 
-->

<script>
    let { profileData, updateProfileData } = $props();

    import { enhance } from "$app/forms";

    // Gets today's date and splits it into a date object
    let today = new Date().toISOString().split("T")[0];
    let todayDate = new Date(today);

    // Get the date from the profileData and split it into a date object
    let tempFromDate = new Date(profileData.pauseNotificationStart);
    let tempToDate = new Date(profileData.pauseNotificationEnd);

    // Checks if the date from the profileData is greater than today's date, if so, it sets the date to today
    let tempFrom =
        tempFromDate > todayDate
            ? tempFromDate.toISOString().split("T")[0]
            : today;
    let tempTo =
        tempToDate > todayDate ? tempToDate.toISOString().split("T")[0] : today;
</script>

<div class="profile-notis-title">Notification</div>

<form
    style="all: unset;"
    class="profile-notis-top"
    action="?/notificationState"
    method="post"
    use:enhance={({ formData }) => {
        formData.set("id", profileData.id);

        return async ({ result }) => {
            switch (result.type) {
                case "failure":
                    alert(`Failed to update notification state, please reload page (F5).\n${result.data?.error}`);
                    break;
                case "success":
                console.log("res:", result.data.responseData);
                    updateProfileData(result.data.responseData);
                    break;
            }
        };
    }}
>
    <div class="profile-notis-top">
        <div class="checkboxOverride">
            <!-- IMPORTANT: input must be above label, because of styling -->
            <input
                type="checkbox"
                name="notificationState"
                id="checkboxInputOverride"
                checked={profileData.notificationState}
                onchange={(event) => {
                    event.target.form.requestSubmit();
                }}
            />
            <label for="checkboxInputOverride"></label>
        </div>
        <div class="profile-notis-check-title">Recieve Notifications</div>
    </div>
</form>

<form
    class="profile-notis-bottom notis-pause-form"
    action="?/pauseNotifications"
    method="post"
    use:enhance={({ formData }) => {
        // `formData` is its `FormData` object that's about to be submitted
        formData.set("id", profileData.id);

        return async ({ result }) => {
            switch (result.type) {
                case "failure":
                    alert(`Failed to update notification pause, please reload page (F5).\n${result.data?.error}`);
                    break;
                case "success":
                    updateProfileData(result.data.responseData);
                    break;
            }
        };
    }}
>
    <div class="profile-notis-bottom-title">Pause Notifications</div>
    <div class="profile-notis-pause-inputs">
        <div class="profile-notis-pause-from">
            <label for="pauseNotificationStart">From</label>
            <input
                type="date"
                name="pauseNotificationStart"
                min={today}
                value={tempFrom}
                required
            />
        </div>
        <div class="profile-notis-pause-to">
            <label for="pauseNotificationEnd">To</label>
            <input
                type="date"
                name="pauseNotificationEnd"
                min={today}
                value={tempTo}
                required
            />
        </div>
    </div>
    <div class="profile-notis-pause-button">
        <input type="submit" value="Pause" />
    </div>
</form>
