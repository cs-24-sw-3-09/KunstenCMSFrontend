
<script>

  let props = $props();

  function constructTimeslot(startTime, endTime, bgcolor, color, prioritize){
    


  }

  let startTime = "06:00";
  let endTime = "12:00";
  let title = "Test"


  function timeToPercentage(time) {
    const parts = time ? time.split(":") : [0, 0];
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    return (hours + minutes / 60) * 4.166;
  }


  console.log(timeToPercentage(startTime));
  console.log(timeToPercentage(endTime));


  let start = timeToPercentage(startTime) + "%";
  let end = timeToPercentage(endTime) - (timeToPercentage(startTime)) + "%";
  let color = "black";
  let bgcolor = "lightblue";



</script>
        <div class="schedule-day timeslot" style="--theme-color: {color}; --theme-bgcolor: {bgcolor}; --theme-left: {start};--theme-right: {end}">
        <div class="schedule-day-timeslot-title">
          {title}
        </div>
        <div class="schedule-day-timeslot-time">
        {startTime} <i class="fa-solid fa-arrow-right-long"></i> {endTime}
        </div>
    </div>



  <style>

.schedule-day {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 1;
  }

  .timeslot{
  color: var(--theme-color);
  height: 100%;
  background-color: var(--theme-bgcolor);
  left: var(--theme-left);
  width: var(--theme-right);




}



  </style>


    
