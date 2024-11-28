<script>
    import Header from "$lib/components/schedule/weekheader.svelte";
    import TableRowPopulator from "$lib/components/schedule/weektablerowpopulator.svelte";

    // import testdata from teststore
    import { testScheduleWeek } from "$lib/testdata.js";
    let data = $state([]);
    data = testScheduleWeek;
</script>

<div class="main-content">
        <div class="schedule-week">
            <Header />
            {#each data as device}
                <TableRowPopulator device={device} />
            {/each}
        </div>
</div>

<style>
    @import "$lib/styles/schedule_week.css";
</style>
