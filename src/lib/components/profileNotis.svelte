<script>
    let { profileData, doToggleNotifications, doPauseNotifications} = $props();

    // Gets today's date
    let today  = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    // Initialize dates from profileData or default to today
    let fromDate = $state(profileData.pauseNotificationStart 
        ? new Date(profileData.pauseNotificationStart).toISOString().split("T")[0] 
        : today);

    let toDate = $state(profileData.pauseNotificationEnd 
        ? new Date(profileData.pauseNotificationEnd).toISOString().split("T")[0] 
        : today);

    // Event handler to update 'toDate' based on 'fromDate'
    function handleFromDateChange(event) {
        fromDate = event.target.value;
        if (new Date(toDate) < new Date(fromDate)) {
            toDate = fromDate; // Ensure 'toDate' is not before 'fromDate'
        }
    }

    // Event handler to update 'toDate'
    function handleToDateChange(event) {
        toDate = event.target.value;
    }
</script>

<div class="profile-notis-title">Notification</div>
<div class="profile-notis-top">
    <div class="checkboxOverride">
        <input checked type="checkbox" name="notificationState" id="checkboxInputOverride" value={profileData.notificationState} onchange="{doToggleNotifications}"/>
        <label for="checkboxInputOverride"></label>
    </div>
    <div class="profile-notis-check-title">Recieve Notifications</div>
</div>
<form class="profile-notis-bottom notis-pause-form" action="#" onsubmit={doPauseNotifications}>
    <div class="profile-notis-bottom-title">Pause Notifications</div>
    <div class="profile-notis-pause-inputs">
        <div class="profile-notis-pause-from">
            <label for="pauseNotificationStart">From</label>
            <input type="date" name="pauseNotificationStart" id="pauseNotificationStart" min={today} value={fromDate} onchange={handleFromDateChange}  required />
        </div>
        <div class="profile-notis-pause-to">
            <label for="pauseNotificationEnd">To</label>
            <input type="date" name="pauseNotificationEnd" id="pauseNotificationEnd" min={fromDate} value={toDate} onchange={handleToDateChange}  required />
        </div>
    </div>
    <div class="profile-notis-pause-button">
        <input type="submit" value="Pause" />
    </div>
</form>
