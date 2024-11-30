<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data, form } = $props();

    import HeaderDates from "./headerdates.svelte";
    import Button from "$lib/components/button.svelte";

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

    let formatFocusDate = $derived.by(() => {
        const options = {
            day: "numeric",
            month: "short",
        };

        const rt = focusDate.toLocaleDateString("en-GB", options)
            + ", " + focusDate.getFullYear();
        return rt;
    }); // Reactive variable
    
    let focusWeek = $derived.by(() => {
        return updateFocusWeek(focusDate);
    }); // Reactive variable

    let formatFocusWeek = $derived.by(() => {
        const options = {
            day: "numeric",
            month: "short",
        };

        const rt = focusWeek.start.toLocaleDateString("en-GB", options)
            + " - " + focusWeek.end.toLocaleDateString("en-GB", options)
            + ", " + focusDate.getFullYear();

        return rt;
    });// Reactive variable

    function updateFocusWeek(date) {
        const dayOfWeek = date.getDay();
        const daysToMonday = (dayOfWeek + 6) % 7;
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - daysToMonday); // Adjust for Monday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Should be sunday

        const weekNumber = getISOWeekNumber(date, startOfWeek);

        console.log({
            week: weekNumber,
            start: startOfWeek,
            end: endOfWeek,
        });

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
                        <Button
                            text={"Change to Day View"}
                            clickFunction={() => (weekView = false)}
                        />
                    {:else}
                        <Button
                            text={"Change to Week View"}
                            clickFunction={() => (weekView = true)}
                        />
                    {/if}
                </div>
                <div>
                    <Button text={"Today"} />
                    <Button text={"<"} />
                    <Button text={">"} />
                </div>
            </div>
        </div>
        
        {#if weekView}
            WeekView
        {:else}
            DayView
        {/if}
        
    </div>
</div>

{#if showNewTimeslotModal}
    NewTimeslotModal
{/if}
{#if showEditTimeslotModal}
    EditTimeslotModal
{/if}

<style>
    @import "$lib/styles/schedule.css";
    @import "$lib/styles/button.css";
</style>
