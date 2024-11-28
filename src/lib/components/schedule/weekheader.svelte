<script>
  let weekrange = "";
  let currentDay1 = new Date();

  function getWeekRange(inputdata) {
    const today = new Date(inputdata);

    const dayOfWeek = today.getDay();

    const daysToMonday = (dayOfWeek + 6) % 7;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - daysToMonday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const getDayOrdinal = (day) => {
      const Ordinal = ["th", "st", "nd", "rd"];
      const value = day % 100;
      return Ordinal[(value - 20) % 10] || Ordinal[value] || Ordinal[0];
    };

    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      return `${month}. ${day}${getDayOrdinal(day)}`;
    };
    return (weekrange = `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}, ${startOfWeek.getFullYear()}`);
  }

  function getWeekDatesFormatted(inputDate) {
    const date = new Date(inputDate);
    const dayOfWeek = date.getDay();
    const startOfWeek = date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);

    const weekDates = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(date);
      currentDay.setDate(startOfWeek + i);

      const dayName = daysOfWeek[currentDay.getDay()];
      const formattedDate = `${dayName} ${currentDay.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })}`;
      weekDates.push(formattedDate);
    }

    return weekDates;
  }

  //Function to calculate ISO week number
  function getISOWeekNumber(date) {
    const dayOfWeek = date.getDay() || 7;
    date.setDate(date.getDate() + 4 - dayOfWeek);

    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const startDayOfWeek = startOfYear.getDay() || 7;

    const firstThursday =
      startDayOfWeek <= 4
        ? startOfYear
        : new Date(
            startOfYear.setDate(startOfYear.getDate() + (8 - startDayOfWeek)),
          );

    return Math.ceil(((date - firstThursday) / 86400000 + 1) / 7);
  }

  // Function to shift the current date by a number of weeks
  function shiftWeek(shift) {
    // Add or subtract 7 days (one week) and reassign currentDate
    const newDate = new Date(currentDay1);
    newDate.setDate(currentDay1.getDate() + shift * 7);
    currentDay1 = newDate; // Reassign to trigger reactivity
  }

  // Function to reset to the current date's week
  function resetToCurrentWeek() {
    currentDay1 = new Date(); // Reset to today
  }

  // Reactive statement variables
  $: week = getWeekDatesFormatted(new Date(currentDay1));
  $: isoWeekNumber = "Week " + getISOWeekNumber(new Date(currentDay1));
  $: weekrange = getWeekRange(new Date(currentDay1));
</script>

<div class="schedule-week-header">
  <div class="schedule-week-header-top">
    <div class="schedule-week-header-top-left">
      {weekrange}
    </div>
    <div class="schedule-week-header-middle">
      <a
        href="/schedule-day"
        class="schedule-week-header-day-button tooltippable tooltipText-Change-to-day-schedule"
        >Change to Day Schedule</a
      >
    </div>
    <div class="schedule-week-header-top-right">
      <button onclick={resetToCurrentWeek}>Today</button>

      <button onclick={() => shiftWeek(-1)} aria-label="Previous Week"
        ><i class="arrow left"></i></button
      >
      <button onclick={() => shiftWeek(1)} aria-label="Next Week"
        ><i class="arrow right"></i></button
      >
    </div>
  </div>

  <!-- TODO: AAAAALLL these buttons are not working -->
  <div class="schedule-week-header-bottom">
      <div class="schedule-week-header-devices">{isoWeekNumber}</div>
      <a href="/html/schedule-day.html" class="schedule-week-header-day"
          >{week[0]}</a
      >
      <a href="/html/schedule-day.html" class="schedule-week-header-day"
          >{week[1]}</a
      >
      <a href="/html/schedule-day.html" class="schedule-week-header-day"
          >{week[2]}</a
      >
      <a href="/html/schedule-day.html" class="schedule-week-header-day"
          >{week[3]}</a
      >
      <a href="/html/schedule-day.html" class="schedule-week-header-day"
          >{week[4]}</a
      >
      <a href="/html/schedule-day.html" class="schedule-week-header-day"
          >{week[5]}</a
      >
      <a href="/html/schedule-day.html" class="schedule-week-header-day"
          >{week[6]}</a
      >
    </div>
</div>
