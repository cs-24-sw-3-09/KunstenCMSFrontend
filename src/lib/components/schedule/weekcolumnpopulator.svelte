<script>
    let { dayfields, toggleEditTimeslotModal } = $props();

    import TimeslotTemplate from "$lib/components/schedule/weektimeslotdayfield.svelte";

    function overlapCheck(timeslot1, timeslot2) {
        if (timeslot1.id === timeslot2.id) return false;
        if (timeslot1.endTime < timeslot2.startTime || timeslot1.endTime === timeslot2.startTime ||
        timeslot1.startTime === timeslot2.endTime || timeslot1.startTime > timeslot2.endTime) return false;
        return true;
    }
</script>

<div class="schedule-week-schema-row-day">
    {#each dayfields as dayfield}
        {#if dayfields.some(dayfieldOverlapEntity => overlapCheck(dayfield.timeslot, dayfieldOverlapEntity.timeslot))}
            <TimeslotTemplate dayfield={dayfield} toggleEditTimeslotModal = {toggleEditTimeslotModal} colorClass = {"color-red"}/>
        {:else}
            <TimeslotTemplate dayfield={dayfield} toggleEditTimeslotModal = {toggleEditTimeslotModal} colorClass = {"color-neutral"}/>
        {/if}
    {/each}
</div>
