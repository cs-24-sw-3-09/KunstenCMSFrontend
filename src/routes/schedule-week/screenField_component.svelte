<script>

    let props = $props();

import TimeSlotCard from "./timeslot_templet.svelte"

</script>


<div class="schedule-week-schema-row-day">
    <div class="schedule-week-schema-row-item-add">
      <i class="fa-solid fa-plus"></i>
    </div>
    {#each props.fields as timeslot}
        <TimeSlotCard title={timeslot.title} color={timeslot.color}/>
    {/each}
</div>