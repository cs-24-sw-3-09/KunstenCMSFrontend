<script>

import Buttom from "./buttom.component.svelte"

    let time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ,23];

    
function getWeekRange() {
    const today = new Date();
  
    
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


let day = getWeekRange();


</script>


<div class="schedule-day-header">
    <div class="schedule-day-header-top">
      <div class="schedule-day-header-top-left">{day}
        <Buttom/>
      </div>
      


      

      <div class="schedule-week-header-middle">
        <a
          href="/schedule-week"
          class="schedule-day-header-week-button tooltippable tooltipText-Change-to-week-schedule"
          >Change to Week Schedule</a
        >
      </div>
      <div class="schedule-day-header-top-right">
        <button class="tooltippable tooltipText-Today">Today</button>
        <button class="tooltippable tooltipText-previous-day"><i class="arrow left"></i></button>
        <button class="tooltippable tooltipText-Next-day"><i class="arrow right"></i></button>
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


