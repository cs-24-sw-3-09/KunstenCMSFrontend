<script>
    let { dayfields, toggleEditTimeslotModal } = $props();

    import TimeslotTemplate from "$lib/components/schedule/weektimeslotdayfield.svelte";
</script>

<div class="schedule-week-schema-row-day">

    {#each dayfields as dayfield}
        <TimeslotTemplate dayfield={dayfield} toggleEditTimeslotModal = {toggleEditTimeslotModal} />
    {/each}
</div>
