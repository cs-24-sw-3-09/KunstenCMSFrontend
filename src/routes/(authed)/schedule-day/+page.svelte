<script>
    import Screen from "./screen_component_day.svelte";
    import TimeHeader from "./timeHeader_component.svelte";

    // import testdata from teststore
    import { testScheduleDay } from "$lib/testdata.js";
    let data = testScheduleDay;
    
</script>

<div class="main-content">
    <div>
        <div class="schedule-day">
            <TimeHeader />
            {#each data as device}
                <Screen {device} />
            {/each}
        </div>
    </div>
</div>

<style>
    @import "$lib/styles/schedule_day.css";
</style>
