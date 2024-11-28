<script>
    import Header from "$lib/components/schedule/weekheader.svelte";
    import TableRowPopulator from "$lib/components/schedule/weektablerowpopulator.svelte";

    // import testdata from teststore
    import { testScheduleWeek } from "$lib/testdata.js";
    let data = $state([]);
    data = testScheduleWeek;

    /* 
    TODO:
    - Make reactive by dates and timeslots instead of static for weekdays and testDataset
    - Add functionality for adding timeslots???
    - Parse data between schedule-day and week, or make into one page, and switch states that hides one and another
    */
</script>

<div class="main-content">
    <div class="schedule-week">
        <Header />
        {#each data as device}
            <TableRowPopulator {device} />
        {/each}
    </div>
</div>

<style>
    @import "$lib/styles/schedule_week.css";
</style>
