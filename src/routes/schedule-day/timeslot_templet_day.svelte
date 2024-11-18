<script>
  let { timeslot } = $props();

  function timeToPercentage(time) {
    const parts = time ? time.split(":") : [0, 0];
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    return (hours + minutes / 60) * 4.166;
  }

  function timeslotIndex() {}

  let start = timeToPercentage(timeslot.startTime) + "%";
  let end =
    timeToPercentage(timeslot.endTime) -
    timeToPercentage(timeslot.startTime) +
    "%";
</script>

<div class="schedule-day-body-row-schema-row">
  <div
    class="schedule-day timeslot"
    style="--theme-bgcolor: {timeslot.color}; --theme-left: {start};--theme-right: {end}"
  >
    <div class="schedule-day-timeslot-title">
      {timeslot.title}
    </div>
    <div class="schedule-day-timeslot-time">
      {timeslot.startTime} <i class="fa-solid fa-arrow-right-long"></i>
      {timeslot.endTime}
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
    background-color: var(--theme-bgcolor);
    left: var(--theme-left);
    width: var(--theme-right);
  }
</style>
