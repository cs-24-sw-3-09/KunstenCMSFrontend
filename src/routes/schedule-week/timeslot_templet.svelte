<script>

    //import from Database 
    //import {timeslot}

    let props = $props();
    
    let scheduleItems = [
    {
      title: "Default 2024",
      startTime: "6:00",
      endTime: "19:00",
      color: "schedule-color-blue",
      size: "schedule-size-3",
    },
    
  ];

/*
    let timeSlots = &state([]);
    timeslot.subscribe((value)) => {
        timeSlots = value;
    }

    */




</script>


<div class="schedule-container">
    {#each scheduleItems as item}
     <div class={`schedule-week-schema-row-item ${props.color} ${item.size}`}>
        <div class="schedule-week-schema-row-item-title">
          {props.title}
      </div>
     <div class="schedule-week-schema-row-item-time">
       {item.startTime} <i class="fa-solid fa-arrow-right-long"></i> {item.endTime}
        </div>
     </div>
    {/each}
</div> 