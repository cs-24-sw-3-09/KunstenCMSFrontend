
<script>

import Screen from "./screen_component_day.svelte"
import TimeHeader from "./timeHeader_component.svelte"

let data = [
        {
            name: "Recepition Left",
            fields: [
                
                    {
                        title: "Default 2023",
                        color: "rgba(255, 0, 0, 0.6);",
                        startTime: "2:00",
                        endTime: "7:00",
                        size: "schedule-size-3",
                    },
                    {
                        title: "Default 2024",
                        color: "rgba(255, 0, 0, 0.6);",
                        startTime: "8:00",
                        endTime: "20:00",
                        size: "schedule-size-3",
                    }
                
            ],            
        },
        {
          name: "Recepition Right",
            fields: [
                
                    {
                        title: "Default 2023",
                        color: "rgba(59, 137, 255, 0.6);",
                        startTime: "4:00",
                        endTime: "7:00",
                        size: "schedule-size-3",
                    },
                    {
                        title: "Default 2024",
                        color: "rgba(255, 0, 0, 0.6);",
                        startTime: "8:00",
                        endTime: "20:00",
                        size: "schedule-size-3",
                    }
                
            ]
        }
    ]


let color = "red";
let size = "10px"; 

</script>


    <div class="grid-container">
      <div class="main-content">
        <div class="schedule-day">

        

          <TimeHeader/>
          {#each data as device}
          <Screen {device}/> 
          {/each} 

          <div class="schedule-day-body">
            </div>
          </div>
        </div>
      </div>

<style>
    @import "page.css";
</style>