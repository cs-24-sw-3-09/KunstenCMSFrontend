<script>
  let { row, toggleEditTimeslotModal } = $props();
  import ColumnPopulator from "$lib/components/schedule/daycolumnpopulator.svelte";

  function overlapCheck(timeslot1, timeslot2) {
    if (timeslot1.id === timeslot2.id) return false;
    if (timeslot1.endTime < timeslot2.startTime || timeslot1.endTime === timeslot2.startTime ||
      timeslot1.startTime === timeslot2.endTime || timeslot1.startTime > timeslot2.endTime) return false;
    return true;
  }
</script>

<div class="schedule-day-body-row">
  <div class="schedule-day-body-row-device">{row.device.name}</div>
  <div class="schedule-day-body-row-schema">
    {#each row.dayfields as dayfield}
      {#if row.dayfields.some(dayfieldOverlapEntity => overlapCheck(dayfield.timeslot, dayfieldOverlapEntity.timeslot))}
        <ColumnPopulator dayfield={dayfield} toggleEditTimeslotModal = {toggleEditTimeslotModal} colorClass="color-red" />
      {:else}
        <ColumnPopulator dayfield={dayfield} toggleEditTimeslotModal = {toggleEditTimeslotModal} colorClass="color-neutral" />
      {/if}
    {/each}
  </div>
</div>
