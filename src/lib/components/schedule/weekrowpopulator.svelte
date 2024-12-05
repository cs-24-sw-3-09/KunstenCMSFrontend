<script>
    let { row, toggleEditTimeslotModal } = $props();

    import ColumnPopulator from "$lib/components/schedule/weekcolumnpopulator.svelte";
</script>

<div class="schedule-week-schema-row">
    <div class="schedule-week-schema-row-device">{row.device.name}</div>
    <ColumnPopulator dayfields={row.dayfields[0]} toggleEditTimeslotModal = {toggleEditTimeslotModal}/>
    <ColumnPopulator dayfields={row.dayfields[1]} toggleEditTimeslotModal = {toggleEditTimeslotModal}/>
    <ColumnPopulator dayfields={row.dayfields[2]} toggleEditTimeslotModal = {toggleEditTimeslotModal}/>
    <ColumnPopulator dayfields={row.dayfields[3]} toggleEditTimeslotModal = {toggleEditTimeslotModal}/>
    <ColumnPopulator dayfields={row.dayfields[4]} toggleEditTimeslotModal = {toggleEditTimeslotModal}/>
    <ColumnPopulator dayfields={row.dayfields[5]} toggleEditTimeslotModal = {toggleEditTimeslotModal}/>
    <ColumnPopulator dayfields={row.dayfields[6]} toggleEditTimeslotModal = {toggleEditTimeslotModal}/>
</div>
