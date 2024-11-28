<script>
  let { device } = $props();
  import Timeslot from "$lib/components/schedule/daytabledatapopulator.svelte";
</script>

<div class="schedule-day-body-row">
  <div class="schedule-day-body-row-device">{device.name}</div>
  <div class="schedule-day-body-row-schema">
    {#each device.fields as timeslot}
      <Timeslot timeslot={timeslot} />
    {/each}
  </div>
</div>
