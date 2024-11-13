<script>
    let { timeslot } = $props();
</script>

<div class="schedule-container">
    <div
        class={`schedule-week-schema-row-item ${timeslot.color} ${timeslot.size}`}
    >
        <div class="schedule-week-schema-row-item-title">
            {timeslot.title}
        </div>
        <div class="schedule-week-schema-row-item-time">
            {timeslot.startTime} <i class="fa-solid fa-arrow-right-long"></i>
            {timeslot.endTime}
        </div>
    </div>
</div>
