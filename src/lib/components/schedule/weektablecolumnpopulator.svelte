<script>
    let { fields } = $props();

    import TimeSlotCard from "$lib/components/schedule/weektimeslottemplet.svelte";
</script>

<div class="schedule-week-schema-row-day">
    <div class="schedule-week-schema-row-item-add">
        <i class="fa-solid fa-plus"></i>
    </div>

    {#each fields as timeslot}
        <TimeSlotCard {timeslot} />
    {/each}
</div>
