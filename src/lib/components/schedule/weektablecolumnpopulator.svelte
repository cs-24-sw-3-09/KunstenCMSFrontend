<script>
    let { fields } = $props();

    import TimeslotTemplate from "$lib/components/schedule/weektimeslottemplate.svelte";
</script>

<div class="schedule-week-schema-row-day">
    <div class="schedule-week-schema-row-item-add">
        <i class="fa-solid fa-plus"></i>
    </div>

    {#each fields as timeslot}
        <TimeslotTemplate {timeslot} />
    {/each}
</div>
