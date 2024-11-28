<script>
    import Screen from "$lib/components/schedule/daytablerowpopulator.svelte";
    import Header from "$lib/components/schedule/dayheader.svelte";

    // import testdata from teststore
    import { testScheduleDay } from "$lib/testdata.js";
    let data = testScheduleDay;

    /* 
    TODO: 
    - See todo in schedule week
    - common add timeslot thing
    - common dataset
    */
</script>

<div class="main-content">
    <div class="schedule-day">
        <Header />
        {#each data as device}
            <Screen {device} />
        {/each}
    </div>
</div>

<style>
    @import "$lib/styles/schedule_day.css";
</style>
