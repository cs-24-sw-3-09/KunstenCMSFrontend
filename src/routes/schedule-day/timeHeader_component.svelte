<script>

    let time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ,23];


</script>

<div class="schedule-day-body-header">
    <div class="schedule-day-blank"></div>
    <div class="schedule-day-times">
        {#each time as times}
        <div class="schedule-day-time"> {times + ":00"}</div>
        {/each}
    </div>
  </div>


