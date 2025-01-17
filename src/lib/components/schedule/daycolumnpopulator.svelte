<script>
  let { dayfield, toggleEditTimeslotModal, colorClass } = $props();

  function timeToPercentage(time) {
    const parts = time ? time.split(":") : [0, 0];
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    return (hours + minutes / 60) * 4.166;
  }

  function dateTimeToString(date) {
      let output = ""
      output += date.split(":")[0]
      output+=":"
      output += date.split(":")[1]

      return output;
  }

  let start = timeToPercentage(dayfield.timeslot.startTime) + "%";
  let end =
    timeToPercentage(dayfield.timeslot.endTime) -
    timeToPercentage(dayfield.timeslot.startTime) +
    "%";
</script>

<div
  class="schedule-day-body-row-schema-row"
  
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="schedule-day timeslot {colorClass}"
    style="--theme-left: {start};--theme-right: {end}"
    onclick={() => toggleEditTimeslotModal(dayfield.timeslot)}
  >
    <div class="schedule-day-timeslot-title">
      {dayfield.timeslot.name}
    </div>
    <div class="schedule-day-timeslot-time">
      {dateTimeToString(dayfield.timeslot.startTime)} <i class="fa-solid fa-arrow-right-long"></i>
      {dateTimeToString(dayfield.timeslot.endTime)}
    </div>
  </div>
</div>

<style>
  .schedule-day {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 0;
  }

  .timeslot {
    color: rgb(22, 22, 22);
    height: 100%;
    left: var(--theme-left);
    width: var(--theme-right);
  }
</style>
