<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data, form } = $props();

    import Button from "$lib/components/button.svelte";
    import NewTimeslotModal from "$lib/components/schedule/newtimeslotmodal.svelte";
    import EditTimeslotModal from "$lib/components/schedule/edittimeslotmodal.svelte";


    // TEST DATA; THAT IS NOT ACCURATE TO THE REAL DATA

    import TableRowPopulatorWeek from "$lib/components/schedule/weektablerowpopulator.svelte";
    import TableRowPopulatorDay from "$lib/components/schedule/daytablerowpopulator.svelte";

    // import testdata from teststore
    import { testScheduleDay } from "$lib/testdata.js";
    let daydata = $state(testScheduleDay);

    import { testScheduleWeek } from "$lib/testdata.js";
    let weekdata = $state(testScheduleWeek);






    let weekView = $state(true);
    
    let showNewTimeslotModal = $state(false);
    let showEditTimeslotModal = $state(false);
    
    function toggleNewTimeslotModal() {
        showEditTimeslotModal = false;
        showNewTimeslotModal = !showNewTimeslotModal;
    }
    
    function toggleEditTimeslotModal() {
        showNewTimeslotModal = false;
        showEditTimeslotModal = !showEditTimeslotModal;
    }

    let focusDate = $state();
    focusDate = new Date();
    //$inspect(focusDate);

    let formatFocusDate = $derived.by(() => {
        const options = {
            day: "numeric",
            month: "short",
        };

        return focusDate.toLocaleDateString("en-GB", options)
            + ", " + focusDate.getFullYear();
    }); // Reactive variable
    
    let focusWeek = $derived.by(() => {
        const dayOfWeek = focusDate.getDay();
        const daysToMonday = (dayOfWeek + 6) % 7;
        const startOfWeek = new Date(focusDate);
        startOfWeek.setDate(focusDate.getDate() - daysToMonday); // Adjust for Monday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Should be sunday

        const weekNumber = getISOWeekNumber(focusDate, startOfWeek);

        return {
            week: weekNumber,
            start: startOfWeek,
            end: endOfWeek,
        };
    }); // Reactive variable

    let formatFocusWeek = $derived.by(() => {
        const options = {
            day: "numeric",
            month: "short",
        };

        return focusWeek.start.toLocaleDateString("en-GB", options)
            + " - " + focusWeek.end.toLocaleDateString("en-GB", options)
            + ", " + focusDate.getFullYear();
    });// Reactive variable

    function getISOWeekNumber(date, from) {
        const dayOfWeek = date.getDay() || 7; 

        const usefullDate = new Date(date);
        usefullDate.setDate(date.getDate() + 4 - dayOfWeek);

        const startOfYear = new Date(usefullDate.getFullYear(), 0, 1);
        const daysSinceStart = Math.floor((from - startOfYear) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.ceil((daysSinceStart + startOfYear.getDay() + 1) / 7);

        return weekNumber;
    }

    let formatWeekDayHeader = $derived.by(() => {
        const startOfWeek = focusWeek.start.getDate()

        const weekDates = [];
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(focusDate);
            currentDay.setDate(startOfWeek + i);

            const dayName = daysOfWeek[currentDay.getDay()];
            const formattedDate = `${dayName} ${currentDay.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })}`;
            weekDates.push(formattedDate);
        }

        return weekDates;
    }); // Reactive variable

    let time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
</script>

<div class="main-content">
    <div class="page">
        <!-- HEADER -->
        <div class="schedule-header">
            <div class="schedule-header-top">
                <div class="schedule-header-top-left">
                    {#if weekView}
                        {formatFocusWeek}
                    {:else}
                        {formatFocusDate}
                    {/if}
                    <Button text={"New Timeslot"} clickFunction={() => {showNewTimeslotModal = true}} />
                </div>
                <div>
                    {#if weekView}
                        <Button text={"Change to Day View"} clickFunction={() => (weekView = false)} />
                    {:else}
                        <Button text={"Change to Week View"} clickFunction={() => (weekView = true)} />
                    {/if}
                </div>
                <div>
                    <Button text={"Today"} clickFunction={() => {focusDate = new Date()}} />
                    
                    {#if weekView}
                        <button aria-label="Previous Week" onclick={() => {focusDate = new Date(focusDate.setDate(focusDate.getDate() - 7))}}><i class="arrow left"></i></button>
                        <button aria-label="Next Week" onclick={() => {focusDate = new Date(focusDate.setDate(focusDate.getDate() + 7))}}><i class="arrow right"></i></button>
                    {:else}
                        <button aria-label="Previous Day" onclick={() => {focusDate = new Date(focusDate.setDate(focusDate.getDate() - 1))}}><i class="arrow left"></i></button>
                        <button aria-label="Next Day" onclick={() => {focusDate = new Date(focusDate.setDate(focusDate.getDate() + 1))}}><i class="arrow right"></i></button>
                    {/if}
                </div>
            </div>
        </div>
        
        {#if weekView}
            <div class="schedule-week-header-bottom">
                <div class="schedule-week-header-devices">Week: {focusWeek.week}</div>
                {#each [0, 1, 2, 3, 4, 5, 6] as offest}
                    <a class="schedule-week-header-day" onclick={() => {
                        focusDate = new Date(focusDate.setDate(focusWeek.start.getDate() + offest)); 

                        weekView = !weekView;
                        }}>{formatWeekDayHeader[offest]}</a>
                {/each}                
            </div>    

            <div class="schedule-week">
                {#each weekdata as device}
                    <TableRowPopulatorWeek {device} />
                {/each}
            </div>

        {:else}
            <div class="schedule-day-body-header">
                <div class="schedule-day-blank"></div>
                <div class="schedule-day-times">
                {#each time as times}
                    <div class="schedule-day-time">{times + ":00"}</div>
                {/each}
                </div>
            </div>

            <div class="schedule-day">
                {#each daydata as device}
                    <TableRowPopulatorDay {device} />
                {/each}
            </div>



        {/if}
        
        <h1>DATA IS NOT BEING UTILIZED YET IN THIS PAGE</h1>

    </div>
</div>

{#if showNewTimeslotModal}
    <NewTimeslotModal doClose={toggleNewTimeslotModal} />
{/if}
{#if showEditTimeslotModal}
    <EditTimeslotModal doClose={toggleEditTimeslotModal} />
{/if}

<style>
    @import "$lib/styles/schedule.css";
    @import "$lib/styles/schedule_day.css";
    @import "$lib/styles/schedule_week.css";
</style>
