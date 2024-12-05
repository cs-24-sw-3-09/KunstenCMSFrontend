<script>
  let { dayfield } = $props();

  function timeToPercentage(time) {
    const parts = time ? time.split(":") : [0, 0];
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    return (hours + minutes / 60) * 4.166;
  }

  let start = timeToPercentage(dayfield.timeslot.startTime) + "%";
  let end = timeToPercentage(dayfield.timeslot.endTime) - timeToPercentage(dayfield.timeslot.startTime) + "%";

  let color = $state("#000000"); // Optional: fallback color
    switch (dayfield.color) {
    case "color-1":
        color = "#F2BAC9";
        break;
    case "color-2":
        color = "#BAD7F2";
        break;
    case "color-3":
        color = "#B0F2B4";
        break;
    case "color-4":
        color = "#BAF2E9";
        break;
    case "color-5":
        color = "#F2E2BA";
        break;
    case "color-6":
        color = "#CAE7B9";
        break;
    case "color-7":
        color = "#F3DE8A";
        break;
    case "color-8":
        color = "#EB9486";
        break;
    case "color-9":
        color = "#7E7F9A";
        break;
    case "color-10":
        color = "#97A7B3";
        break;
    case "color-11":
        color = "#CE2754";
        break;
    case "color-12":
        color = "#277DCE";
        break;
    case "color-13":
        color = "#1FC12A";
        break;
    case "color-14":
        color = "#24BCA3";
        break;
    case "color-15":
        color = "#BC9124";
        break;
    case "color-16":
        color = "#904C77";
        break;
    case "color-17":
        color = "#E49AB0";
        break;
    case "color-18":
        color = "#ECB8A5";
        break;
    case "color-19":
        color = "#ECCFC3";
        break;
    case "color-20":
        color = "#957D95";
        break;
}
</script>

<div class="schedule-day-body-row-schema-row">
  <div
    class="schedule-day timeslot"
    style="--theme-bgcolor: {color}; --theme-left: {start};--theme-right: {end}"
  >
    <div class="schedule-day-timeslot-title">
      {dayfield.timeslot.name}
    </div>
    <div class="schedule-day-timeslot-time">
      {dayfield.timeslot.startTime} <i class="fa-solid fa-arrow-right-long"></i>
      {dayfield.timeslot.endTime}
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
