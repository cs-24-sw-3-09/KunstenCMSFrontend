<script>
    let { profileData, updateProfileData } = $props();

    import { enhance } from "$app/forms";

    let currentlyPaused = $state(false);

    // Gets today's date and splits it into a date object
    let today = new Date().toISOString().split("T")[0];
    let todayDate = new Date(today);

    // Get the date from the profileData and split it into a date object
    let tempFromDate =  $derived.by(() => {return new Date(profileData.pauseNotificationStart === null ? "" : profileData.pauseNotificationStart);})
    let tempToDate = $derived.by(() => { return new Date(profileData.pauseNotificationEnd === null ? "" : profileData.pauseNotificationEnd);})

    // Checks if the date from the profileData is greater than today's date
    let tempFrom = $derived.by(() => {
        if (tempToDate >= todayDate) {
            return tempFromDate.toISOString().split("T")[0]
        } else {
            return "";
        }
    });

    let tempTo = $derived.by(() => {
        if (tempToDate >= todayDate) {
            return tempToDate.toISOString().split("T")[0]
        } else {
            return "";
        }
    });

    if (tempToDate >= todayDate) {
        currentlyPaused = true;
    }

</script>

<div class="profile-notis-title">Notifications</div>

<form style="all: unset;" class="profile-notis-top" action="?/notificationState" method="post"
use:enhance={({ formData }) => {
    formData.set("id", profileData.id);

    return async ({ result }) => {
        switch (result.type) {
            case "failure":
                alert(`Failed to update notification state, please reload page (F5).\n${result.data?.error}`);
                break;
            case "success":                
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
                class="profileCheckbox"
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


<div class="profile-notis-title">Pause on notifications</div>

<div class="profile-notis-bottom-title"></div>
{#if currentlyPaused}
    <div class="profile-notis-bottom-title" style="color: green;">Notifications are currently paused<br>from {tempFrom} to {tempTo}</div>
{:else}
    <div class="profile-notis-bottom-title">Notifications are currently not paused</div>
{/if}

<form class="profile-notis-bottom notis-pause-form" action="?/pauseNotifications" method="post"
use:enhance={({ formData }) => {
    // `formData` is its `FormData` object that's about to be submitted
    formData.set("id", profileData.id);

    return async ({ result }) => {
        switch (result.type) {
            case "failure":
                alert(`Failed to update notification pause, please reload page (F5).\n${result.data?.error}`);
                break;
            case "success":
                currentlyPaused = true;
                updateProfileData(result.data.responseData);
                break;
        }
    };
}}>
    <div class="profile-notis-bottom-title">Pause Notifications</div>
    <div class="profile-notis-pause-inputs">
        <div class="profile-notis-pause-from">
            <label for="pauseNotificationStart">From</label>
            <input type="date" name="pauseNotificationStart" min={today} value={tempFrom} required>
        </div>
        <div class="profile-notis-pause-to">
            <label for="pauseNotificationEnd">To</label>
            <input type="date" name="pauseNotificationEnd" min={today} value={tempTo} required>
        </div>
    </div>
    <div class="profile-notis-pause-button">
        <input type="submit" value="Pause" />
    </div>
</form>

<label for="checkboxInputOverride"></label>

<form class="profile-notis-bottom notis-pause-form" action="?/unpauseNotifications" method="post"
use:enhance={({ formData }) => {
    // `formData` is its `FormData` object that's about to be submitted
    formData.set("id", profileData.id);
    formData.set("pauseNotificationStart", "2000-01-01");
    formData.set("pauseNotificationEnd", "2000-01-01");

    return async ({ result }) => {
        switch (result.type) {
            case "failure":
                alert(`Failed to update notification unpause, please reload page (F5).\n${result.data?.error}`);
                break;
            case "success":
                currentlyPaused = false;
                updateProfileData(result.data.responseData);
                break;
        }
    };
}}>
    <div class="profile-notis-bottom-title"></div>
    <div class="profile-notis-bottom-title">Unpause Notifications</div>
    <div class="profile-notis-pause-button">
        <input type="submit" value="Unpause" />
    </div>
</form>
