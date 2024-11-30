<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data, form } = $props();

    import Button from "$lib/components/button.svelte";
    import NewTimeslotModal from "$lib/components/schedule/newtimeslotmodal.svelte";

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
    $inspect(focusDate);

    let formatFocusDate = $derived.by(() => {
        const options = {
            day: "numeric",
            month: "short",
        };

        return focusDate.toLocaleDateString("en-GB", options)
            + ", " + focusDate.getFullYear();
    }); // Reactive variable
    
    let focusWeek = $derived.by(() => {
        return updateFocusWeek(focusDate);
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

    function updateFocusWeek(date) {
        const dayOfWeek = date.getDay();
        const daysToMonday = (dayOfWeek + 6) % 7;
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - daysToMonday); // Adjust for Monday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Should be sunday

        const weekNumber = getISOWeekNumber(date, startOfWeek);

        return {
            week: weekNumber,
            start: startOfWeek,
            end: endOfWeek,
        };
    }

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
                    <Button text={"New Timeslot"} />
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
                    /* TODO: Add logic to change the focus date */
                    focusDate = new Date(focusDate.setDate(focusDate.getDate() + offest));
                    weekView = !weekView;
                    }}>{formatWeekDayHeader[offest]}</a>
            {/each}
        </div>    



        {:else}
            DayView
        {/if}
        
    </div>
</div>

{#if showNewTimeslotModal}
    <NewTimeslotModal />
{/if}
{#if showEditTimeslotModal}
    EditTimeslotModal
{/if}

<style>
    @import "$lib/styles/schedule.css";
</style>
