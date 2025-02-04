<script>
    /** @type {{ data: import('./$types').PageData }} */
    import { env } from "$env/dynamic/public";

    import Button from "$lib/components/button.svelte";
    import NewTimeslotModal from "$lib/components/schedule/newtimeslotmodal.svelte";
    import EditTimeslotModal from "$lib/components/schedule/edittimeslotmodal.svelte";

    import RowPopulatorWeek from "$lib/components/schedule/weekrowpopulator.svelte";
    import RowPopulatorDay from "$lib/components/schedule/dayrowpopulator.svelte";   
    import { onMount } from "svelte";
    import { getCookie } from "$lib/utils/getcookie.js";
    import SavedPopup from "$lib/components/savedpopup.svelte";

    // Data for the page
    let timeslots = $state();

    function updateTimeslots() {
        if( weekView ){
            fetchTimeSlots(focusWeek.start, focusWeek.end);
        } else {
            fetchTimeSlots(focusDate, focusDate);
        }
    }

    // Toggles

    let weekView = $state(true);

    let focusTimeslot = $state(null);
    
    let showNewTimeslotModal = $state(false);
    let showEditTimeslotModal = $state(false);
    
    function toggleNewTimeslotModal() {
        showEditTimeslotModal = false;
        showNewTimeslotModal = !showNewTimeslotModal;
        focusTimeslot = null;
    }
    
    function toggleEditTimeslotModal(timeslot=null) {
        showNewTimeslotModal = false;
        showEditTimeslotModal = !showEditTimeslotModal;
        focusTimeslot = timeslot;
    }

    let focusDate = $state();
    focusDate = new Date();

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

    function weekDataFunc(timeslotsLocal){
        // Helper function to check if two date ranges overlap
        const isOverlapping = (slotStart, slotEnd, rangeStart, rangeEnd) => {
            return (
                (slotStart >= rangeStart && slotStart <= rangeEnd) || // Starts in range
                (slotEnd >= rangeStart && slotEnd <= rangeEnd) || // Ends in range
                (slotStart <= rangeStart && slotEnd >= rangeEnd) // Spans the entire range
            );
        };

        // Helper function to determine if a timeslot is relevant for a specific day
        const isRelevantForDay = (weekdaysChosen, dayIndex) => {      
            return (Number(weekdaysChosen) & (1 << dayIndex)) !== 0; // Check if the bit for the day is set
        };

        // Create a map of devices to their timeslots
        const deviceTimeslotMap = {};

        timeslotsLocal?.forEach(slot => {
            let slotStart = new Date(slot.startDate); /* new Date(`${slot.startDate}T${slot.startTime}`); */
            let slotEnd = new Date(slot.endDate); /* new Date(`${slot.endDate}T${slot.endTime}`); */
            const devices = slot.displayDevices;

            slotStart.setHours(0, 0, 0, 0); // Start of the day
            slotEnd.setHours(23, 59, 59, 999); // End of the day

            // Only consider timeslots that overlap with the week range
            if (isOverlapping(slotStart, slotEnd, focusWeek.start, focusWeek.end)) {
                devices.forEach(device => {
                    // Initialize the device entry if not exists
                    if (!deviceTimeslotMap[device.id]) {
                        deviceTimeslotMap[device.id] = {
                            device,
                            timeslots: [],
                            dayfields: Array.from({ length: 7 }, () => []), // Array of 7 days (Monday-Sunday)
                        };
                    }

                    // Add the timeslot to the device
                    const deviceEntry = deviceTimeslotMap[device.id];
                    deviceEntry.timeslots.push(slot);

                    // Populate dayfields
                    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                        const dayDate = new Date(focusWeek.start);
                        dayDate.setDate(focusWeek.start.getDate() + dayIndex); // Get the actual date for each day

                        // Check if the timeslot is relevant for the current day
                        if (dayDate >= slotStart 
                            && dayDate <= slotEnd 
                            && isRelevantForDay(slot.weekdaysChosen, dayIndex)) {
                            deviceEntry.dayfields[dayIndex].push({
                                timeslot: slot,
                            });
                        }
                    }
                });
            }
        });

        // Convert the map to an array
        return Object.values(deviceTimeslotMap);
    }

    function dayDataFunc(timeslotsLocal){
        const dayStart = new Date(focusDate);
        dayStart.setHours(0, 0, 0, 0); // Start of the day
        const dayEnd = new Date(focusDate);
        dayEnd.setHours(23, 59, 59, 999); // End of the day

        // Helper function to check if a timeslot overlaps with the specific day
        const isOverlapping = (slotStart, slotEnd, dayStart, dayEnd) => {
            return (
                (slotStart >= dayStart && slotStart <= dayEnd) || // Starts within the day
                (slotEnd >= dayStart && slotEnd <= dayEnd) || // Ends within the day
                (slotStart <= dayStart && slotEnd >= dayEnd) // Spans the entire day
            );
        };

        // Helper function to check if the timeslot is relevant for this specific day
        const isRelevantForDay = (weekdaysChosen, dayIndex) => {      
            return (Number(weekdaysChosen) & (1 << dayIndex)) !== 0; // Check if the bit for the day is set
        };

        // Get the day index (0 = Monday, ..., 6 = Sunday)
        let dayIndex = dayStart.getDay() - 1; // Adjust to 0-indexed (Monday = 0)
        if (dayIndex < 0) { dayIndex = 6 }; // Handle Sunday (JavaScript's getDay() returns 0 for Sunday)

        // Create a map of devices to their timeslots
        const deviceTimeslotMap = {};

        timeslotsLocal?.forEach(slot => {
            let slotStart = new Date(slot.startDate); /* new Date(`${slot.startDate}T${slot.startTime}`); */
            let slotEnd = new Date(slot.endDate); /* new Date(`${slot.endDate}T${slot.endTime}`); */
            const devices = slot.displayDevices;

            slotStart.setHours(0, 0, 0, 0); // Start of the day
            slotEnd.setHours(23, 59, 59, 999); // End of the day

            if (isOverlapping(slotStart, slotEnd, dayStart, dayEnd) && isRelevantForDay(slot.weekdaysChosen, dayIndex)) {
                devices.forEach(device => {
                    // Initialize the device entry if not exists
                    if (!deviceTimeslotMap[device.id]) {
                        deviceTimeslotMap[device.id] = {
                            device,
                            timeslots: [],
                            dayfields: [], // Only for the specific day
                        };
                    }

                    // Add the timeslot to the device
                    const deviceEntry = deviceTimeslotMap[device.id];
                    deviceEntry.timeslots.push(slot);

                    // Add to dayfields
                    deviceEntry.dayfields.push({
                        timeslot: slot,
                    });
                });
            }
        });

        // Convert the map to an array
        return Object.values(deviceTimeslotMap);
    }

    let visualContent = $state([]);
    let displayDevices = $state([]);

    function fetchTimeSlots(start, end) {
        const formatDate = (date) => date.toISOString().split('T')[0]; //Formats to: YYYY-MM-DD.

        timeslots = fetch(env.PUBLIC_API_URL + "/api/time_slots?start=" + formatDate(start) + "&end=" + formatDate(end), {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + getCookie("authToken"),
            }
        }).then((data) => data.json()).then((json) => {
            return json?.content;
        });
    }

    onMount(async () => {

        fetchTimeSlots(focusWeek.start, focusWeek.end)

        const visualMedia = await fetch(env.PUBLIC_API_URL + "/api/visual_medias/all", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + getCookie("authToken"),
            }
        });

        let visualMediasData = await visualMedia.json();

        visualMediasData = visualMediasData.map(visualMedia => {
            return { ...visualMedia, type: "visualMedia" }
        });


        const slideshows = await fetch(env.PUBLIC_API_URL + "/api/slideshows", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + getCookie("authToken"),
            }
        });

        let slideshowsData = await slideshows.json();

        slideshowsData = slideshowsData.map(slideshow => {
            return { ...slideshow, type: "slideshow" }
        });

        visualContent = slideshowsData?.concat(visualMediasData);

        visualContent = visualContent?.filter(displayContentElement => 
            ( displayContentElement.type === "slideshow" && !displayContentElement.isArchived ) || (displayContentElement.type !== "slideshow" && displayContentElement.fileType !== "video/mp4" )
        );

        const displayDevicesData = await fetch(env.PUBLIC_API_URL + "/api/display_devices/all", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + getCookie("authToken"),
            }
        });

        displayDevices = await displayDevicesData.json();
    });

    let popup;

    function saveData(success) {
    if (success) {
    popup.show("Your changes have been saved!", "success");
    } else {
    popup.show("Failed to save changes!", "error");
    }
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
                </div>
                <div class="schedule-header-top-right">
                    <Button text={"New Timeslot"} clickFunction={() => {showNewTimeslotModal = true}} />
                    <SavedPopup bind:this={popup} />

                    <div>
                    {#if weekView}
                        <Button text={"Change to Day View"} clickFunction={() => { (weekView = false); fetchTimeSlots(focusDate, focusDate) }} />
                    {:else}
                        <Button text={"Change to Week View"} clickFunction={() => { (weekView = true); fetchTimeSlots(focusWeek.start, focusWeek.end)}} />
                    {/if}
                    </div>
                
                    <div class="schedule-header-top-right-nav">
                        <Button text={"Today"} clickFunction={() => {focusDate = new Date();
                            if (weekView) {
                                fetchTimeSlots(focusWeek.start, focusWeek.end);
                            } else {
                                fetchTimeSlots(focusDate, focusDate);
                            }
                        }} />
                        
                        {#if weekView}
                            <button aria-label="Previous Week" onclick={() => {focusDate = new Date(focusDate.setDate(focusDate.getDate() - 7)); fetchTimeSlots(focusWeek.start, focusWeek.end)}}><i class="arrow left"></i></button>
                            <button aria-label="Next Week" onclick={() => {focusDate = new Date(focusDate.setDate(focusDate.getDate() + 7)); fetchTimeSlots(focusWeek.start, focusWeek.end)}}><i class="arrow right"></i></button>
                        {:else}
                            <button aria-label="Previous Day" onclick={() => {focusDate = new Date(focusDate.setDate(focusDate.getDate() - 1)); fetchTimeSlots(focusDate, focusDate)}}><i class="arrow left"></i></button>
                            <button aria-label="Next Day" onclick={() => {focusDate = new Date(focusDate.setDate(focusDate.getDate() + 1)); fetchTimeSlots(focusDate, focusDate)}}><i class="arrow right"></i></button>
                        {/if}
                    </div>
                </div>

                
            </div>
        </div>
        
        {#if weekView}
            <div class="schedule-week-header-bottom schedule-day-body-header">
                <div class="schedule-week-header-devices">Week: {focusWeek.week}</div>
                {#each [0, 1, 2, 3, 4, 5, 6] as offest}
                    <a class="schedule-week-header-day" onclick={() => {
                        focusDate = new Date(focusDate.setDate(focusWeek.start.getDate() + offest)); 

                        weekView = !weekView;
                        }}>{formatWeekDayHeader[offest]}</a>
                {/each}
            </div>

            <div class="schedule-week">
                {#await timeslots}
                    Loading...
                {:then timeslotsData}
                    {#each weekDataFunc(timeslotsData) as row}
                        <RowPopulatorWeek row={row} toggleEditTimeslotModal = {toggleEditTimeslotModal}  />
                    {/each}
                {/await}
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
                {#await timeslots}
                    Loading...
                {:then timeslotsData}
                    {#each dayDataFunc(timeslotsData) as row}
                        <RowPopulatorDay row={row} toggleEditTimeslotModal = {toggleEditTimeslotModal} />
                    {/each}
                {/await}
            </div>

        {/if}
        

    </div>
</div>

{#if showNewTimeslotModal}
    <NewTimeslotModal doClose={toggleNewTimeslotModal} displayDevices = {displayDevices} visualContent = { visualContent } updateTimeslots = {updateTimeslots} saveData={saveData}/>
{/if}
{#if showEditTimeslotModal}
    <EditTimeslotModal doClose={toggleEditTimeslotModal} timeslot = {focusTimeslot} displayDevices = {displayDevices} visualContent = { visualContent } updateTimeslots = {updateTimeslots} saveData={saveData}/>
{/if}

<style>
    @import "$lib/styles/schedule.css";
    @import "$lib/styles/schedule_day.css";
    @import "$lib/styles/schedule_week.css";

</style>
