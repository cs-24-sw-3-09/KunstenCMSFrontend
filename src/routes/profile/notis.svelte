<!-- 
    TODO: Add functionality for editing notifications 
-->

<script>
    let { profileData, doToggleNotifications, doPauseNotifications} = $props();

    // Gets today's date and splits it into a date object
    let today  = new Date().toISOString().split("T")[0];
    let todayDate = new Date(today);

    // Get the date from the profileData and split it into a date object
    let tempFromDate = new Date(profileData.pause_notifications.from);
    let tempToDate  = new Date(profileData.pause_notifications.to);

    // Checks if the date from the profileData is greater than today's date, if so, it sets the date to today
    let tempFrom = tempFromDate > todayDate ? tempFromDate.toISOString().split("T")[0] : today;
    let tempTo = tempToDate > todayDate ? tempToDate.toISOString().split("T")[0] : today;    
</script>

<div class="profile-notis-title">Notification</div>
<div class="profile-notis-top">
    <div class="checkboxOverride">
        <input checked type="checkbox" name="" id="checkboxInputOverride" value={profileData.notifications} onchange="{doToggleNotifications}"/>
        <label for="checkboxInputOverride"></label>
    </div>
    <div class="profile-notis-check-title">Recieve Notifications</div>
</div>
<form class="profile-notis-bottom notis-pause-form" action="#" onsubmit={doPauseNotifications}>
    <div class="profile-notis-bottom-title">Pause Notifications</div>
    <div class="profile-notis-pause-inputs">
        <div class="profile-notis-pause-from">
            <label for="from">From</label>
            <input type="date" name="from" id="from"  min={today} value={tempFrom} required />
        </div>
        <div class="profile-notis-pause-to">
            <label for="to">To</label>
            <input type="date" name="to" id="to" min={today} value={tempTo} required />
        </div>
    </div>
    <div class="profile-notis-pause-button">
        <input type="submit" value="Pause" />
    </div>
</form>
