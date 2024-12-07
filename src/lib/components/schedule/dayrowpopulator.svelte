<script>
  let { row, toggleEditTimeslotModal } = $props();
  import ColumnPopulator from "$lib/components/schedule/daycolumnpopulator.svelte";
</script>

<div class="schedule-day-body-row">
  <div class="schedule-day-body-row-device">{row.device.name}</div>
  <div class="schedule-day-body-row-schema">
    {#each row.dayfields as dayfield}
      <ColumnPopulator dayfield={dayfield} toggleEditTimeslotModal = {toggleEditTimeslotModal}/>
    {/each}
  </div>
</div>
