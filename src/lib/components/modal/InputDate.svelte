<script>

    // Declare variables for the date and time
    let { addtimeslotform } = $props();



</script>

<div>
    <p>From</p>
    <label for="dateFrom">Date:</label>
    <input
        type="date"
        id="dateFrom"
        name="dateFrom"
        bind:value={addtimeslotform.selectedDateFrom}
    />
    <label for="timeFrom">Time:</label>
    <input
        type="time"
        id="timeFrom"
        name="timeFrom"
        bind:value={addtimeslotform.selectedTimeFrom} 
    />

    <p>To</p>
    <label for="dateTo">Date:</label>
    <input
        type="date"
        id="dateTo"
        name="dateTo"
        bind:value={addtimeslotform.selectedDateTo}
    />
    <label for="timeTo">Time:</label>
    <input
        type="time"
        id="timeTo"
        name="timeTo"
        bind:value={addtimeslotform.selectedTimeTo}
    />
</div>
