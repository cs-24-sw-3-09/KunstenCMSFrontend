<script>
    let { row } = $props();

    import ColumnPopulator from "$lib/components/schedule/weekcolumnpopulator.svelte";
</script>

<div class="schedule-week-schema-row">
    <div class="schedule-week-schema-row-device">{row.device.name}</div>
    <ColumnPopulator dayfields={row.dayfields[0]}/>
    <ColumnPopulator dayfields={row.dayfields[1]}/>
    <ColumnPopulator dayfields={row.dayfields[2]}/>
    <ColumnPopulator dayfields={row.dayfields[3]}/>
    <ColumnPopulator dayfields={row.dayfields[4]}/>
    <ColumnPopulator dayfields={row.dayfields[5]}/>
    <ColumnPopulator dayfields={row.dayfields[6]}/>
</div>
