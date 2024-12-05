<script>
    let { dayfields } = $props();

    import TimeslotTemplate from "$lib/components/schedule/weektimeslotdayfield.svelte";
</script>

<div class="schedule-week-schema-row-day">
    <div class="schedule-week-schema-row-item-add">
        <i class="fa-solid fa-plus"></i>
    </div>

    {#each dayfields as dayfield}
        <TimeslotTemplate dayfield={dayfield} />
    {/each}
</div>
