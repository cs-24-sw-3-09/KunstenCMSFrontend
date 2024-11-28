<script>
  import Timeslot from "$lib/components/schedule/daytabledatapopulator.svelte";
  let props = $props();

</script>

<div class="schedule-day-body-row">
  <div class="schedule-day-body-row-device">{props.device.name}</div>
  <div class="schedule-day-body-row-schema">
    {#each props.device.fields as timeslot}
      <Timeslot {timeslot} />
    {/each}
  </div>
</div>
