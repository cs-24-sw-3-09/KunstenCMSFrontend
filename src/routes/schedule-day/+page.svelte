
<script>



import Screen from "./screen_component_day.svelte"
import TimeHeader from "./timeHeader_component.svelte"


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
            </div>
          </div>

          <TimeHeader/>
          <Screen/>

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
</style>