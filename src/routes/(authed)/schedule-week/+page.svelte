<script>
    import Header from "$lib/components/schedule/weekheader.svelte";
    import TableRowPopulatorWeek from "$lib/components/schedule/weektablerowpopulator.svelte";

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
    
    <Header />
    <div class="schedule-week">
        {#each data as device}
            <TableRowPopulatorWeek {device} />
        {/each}
    </div>
</div>

<style>
    @import "$lib/styles/schedule_week.css";
</style>
