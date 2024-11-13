<script>

import Timeslot from "./timeslot_templet_day.svelte";
let props = $props();
let name = "test "
</script>




  <div class="schedule-day-body-row">
    <div class="schedule-day-body-row-device">{name}</div>
    <div class="schedule-day-body-row-schema">
      <div class="schedule-day-body-row-schema-row">
      <Timeslot/>

      </div>
    </div>
    <div class="schedule-day-body-row-add">+</div>
  </div>