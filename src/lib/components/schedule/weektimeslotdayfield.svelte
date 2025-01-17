<script>
    let { dayfield, toggleEditTimeslotModal, colorClass } = $props();
</script>

<div class="schedule-container"
onclick = {() => toggleEditTimeslotModal(dayfield.timeslot)}>
    <div
        class={`schedule-week-schema-row-item ${colorClass} schedule-size-3`}
    >
        <div class="schedule-week-schema-row-item-title">
            {dayfield.timeslot.name}
        </div>
        <div class="schedule-week-schema-row-item-time">
            {dayfield.timeslot.startTime}
            <i class="fa-solid fa-arrow-right-long"></i>
            {dayfield.timeslot.endTime}
        </div>
    </div>
</div>
