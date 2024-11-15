<script>

import Timeslot from "./timeslot_templet_day.svelte";
let props = $props();

console.log(props.device.name);

</script>




  <div class="schedule-day-body-row">
    <div class="schedule-day-body-row-device">{props.device.name}</div>
    <div class="schedule-day-body-row-schema">
        {#each props.device.fields  as timeslot}
            <Timeslot {timeslot} />
        {/each}
    </div>
  </div>