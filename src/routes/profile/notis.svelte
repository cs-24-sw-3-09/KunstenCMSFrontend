<!-- 
    TODO: Add functionality for editing notifications 
-->

<script>
    let { profileData } = $props();
</script>

<div class="profile-notis-title">Notification</div>
<div class="profile-notis-top">
    <div class="checkboxOverride">
        <input
            checked
            type="checkbox"
            name=""
            id="checkboxInputOverride"
            value="1"
        />
        <label for="checkboxInputOverride"></label>
    </div>
    <div class="profile-notis-check-title">Recieve Notifications</div>
</div>
<form class="profile-notis-bottom">
    <div class="profile-notis-bottom-title">Pause Notifications</div>
    <div class="profile-notis-pause-inputs">
        <div class="profile-notis-pause-from">
            <label for="from">From</label>
            <input type="date" name="" id="from" required />
        </div>
        <div class="profile-notis-pause-to">
            <label for="to">To</label>
            <input type="date" name="" id="to" required />
        </div>
    </div>
    <div class="profile-notis-pause-button">
        <button cnclick>Pause</button>
    </div>
</form>
