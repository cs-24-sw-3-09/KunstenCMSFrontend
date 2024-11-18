<script>

  import Buttom from "./buttom.component.svelte"

let currentDay1 = new Date();

    let time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ,23];

    
function getWeekRange(input) {
    const today = new Date(input);
  
    
    const getDayOrdinal = (day) => {
        const Ordinal = ["th", "st", "nd", "rd"];
        const value = day % 100;
        return Ordinal[(value - 20) % 10] || Ordinal[value] || Ordinal[0];
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        return `${month}. ${day}${getDayOrdinal(day)}`;
    }

    return (`${formatDate(today)} ${today.getFullYear()}`);
}

  //Function to calculate ISO week number
  function getISOWeekNumber(date) {
    const dayOfWeek = date.getDay() || 7;
    date.setDate(date.getDate() + 4 - dayOfWeek);

    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const startDayOfWeek = startOfYear.getDay() || 7;

    const firstThursday = startDayOfWeek <= 4
      ? startOfYear
      : new Date(startOfYear.setDate(startOfYear.getDate() + (8 - startDayOfWeek)));

    return Math.ceil(((date - firstThursday) / 86400000 + 1) / 7);
  }



  // Function to shift the current date by a number of weeks
  function shiftWeek(shift) {
    // Add or subtract 7 days (one week) and reassign currentDate
    const newDate = new Date(currentDay1);
    newDate.setDate(currentDay1.getDate() + shift);
    currentDay1 = newDate; // Reassign to trigger reactivity
  }

    // Function to reset to the current date's week
    function resetToCurrentWeek() {
    currentDay1 = new Date(); // Reset to today
  }




$: day = getWeekRange(new Date(currentDay1));
$: isoWeekNumber ="Week " + getISOWeekNumber(new Date(currentDay1));

</script>


<div class="schedule-day-header">
    <div class="schedule-day-header-top">
      <div class="schedule-day-header-top-left"  >{isoWeekNumber} {day}
        <Buttom/>
      </div>
      

      <div class="schedule-week-header-middle">
        <a
          href="/schedule-week"
          class="schedule-day-header-week-button tooltippable tooltipText-Change-to-week-schedule"
          >Change to Week Schedule</a
        >
      </div>
      <div class="schedule-week-header-top-right">
        <button on:click={resetToCurrentWeek}>Today</button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={() => shiftWeek(-1)}><i class="arrow left"></i></button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={() => shiftWeek(1)}><i class="arrow right"></i></button>
      </div>
  </div>
</div>
<div class="schedule-day-body-header">
    <div class="schedule-day-blank"></div>
    <div class="schedule-day-times">
        {#each time as times}
        <div class="schedule-day-time"> {times + ":00"}</div>
        {/each}
    </div>
  </div>


