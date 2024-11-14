
<script>

  let props = $props();

  let data = [{
    screens:  [{
      id: [{
        endTime: "09:00",
        startTime: "07:00",
        title: "test",
        prioritize: 1

        },
        {
        endTime: "17:00",
        startTime: "10:00",
        title: "test",
        prioritize: 1
        }

      ]

  }]
  }]



import Screen from "./screen_component_day.svelte"
import TimeHeader from "./timeHeader_component.svelte"


let color = "red";
let size = "10px"; 

</script>





    <div class="grid-container">
      <div class="main-content">
        <div class="schedule-day">
          <!--Header-->
          <div class="schedule-day-header">
            <div class="schedule-day-header-top">
              <div class="schedule-day-header-top-left">Oct. 23rd, 2024</div>
              <div class="schedule-week-header-middle">
                <a
                  href="/schedule-week"
                  class="schedule-day-header-week-button tooltippable tooltipText-Change-to-week-schedule"
                  >Change to Week Schedule</a
                >
              </div>
              <div class="schedule-day-header-top-right">
                <button class="tooltippable tooltipText-Today">Today</button>
                <button class="tooltippable tooltipText-previous-day"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="tooltippable tooltipText-Next-day"><i class="fa-solid fa-chevron-right"></i></button>
              </div>
              <div style="--theme-color: {color}; --theme-size: {size};">
                <p class="timeslot">
                  the color is set using a CSS variable
                </p>
              </div>
            </div>
          </div>

          <TimeHeader/>
          {#each data as device}
          <Screen {device}/> 
          {/each} 

          <div class="schedule-day-body">

            <div class="schedule-day-body-schemas">


                <div class="schedule-day-body-row-add">hallalallala</div>
              </div>


            </div>
          </div>
        </div>
      </div>

<style>
    @import "page.css";
.timeslot{
  color: var(--theme-color);
  font-size: var(--theme-size);

}

</style>