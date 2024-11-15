<script>


import Header from "./header_component.svelte"
import Screen from "./screen_component.svelte"

    let data = [
        {
            name: "Recepition Left",
            fields: [
                [
                    {
                        title: "Default 2023",
                        color: "schedule-color-blue",
                        startTime: "6:00",
                        endTime: "19:00",
                        size: "schedule-size-3",
                        id: 1,
                    },
                    {
                        title: "Default 2024",
                        color: "schedule-color-blue",
                        startTime: "6:00",
                        endTime: "19:00",
                        size: "schedule-size-3",
                        id: 1,
                    }
                ],
                [
                    {
                        title: "Default test",
                        color: "schedule-color-red",
                        startTime: "6:00",
                        endTime: "19:00",
                        size: "schedule-size-3",
                        id: 1,
                    },
                ],
                [],
                [],
                [],
                [],
                [],
            ],
        },
        {
            name: "Recepition Right",
            fields: [
                [
                    {
                        title: "Default 2023",
                        color: "schedule-color-red",
                        startTime: "6:00",
                        endTime: "19:00",
                        size: "schedule-size-3",
                        id: 1,
                    },
                    {
                        title: "Default 2024",
                        color: "schedule-color-blue",
                        startTime: "6:00",
                        endTime: "19:00",
                        size: "schedule-size-3",
                        id: 1,
                    }
                ],
                [
                    {
                        title: "Default test",
                        color: "schedule-color-red",
                        startTime: "6:00",
                        endTime: "19:00",
                        size: "schedule-size-3",
                        id: 1,
                    },
                ],
                [],
                [],
                [],
                [],
                [],
            ],
        }
    ]

</script>


    <div class="grid-container">
      <div class="main-content">
        <div class="schedule-week">
            <Header/>
            {#each data as device}
                <Screen {device}/> 
            {/each} 

             </div>
      </div>
    </div>


 <style>
    @import "./page.css";
</style>