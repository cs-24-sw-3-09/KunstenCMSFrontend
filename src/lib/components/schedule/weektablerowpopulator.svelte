<script>
    let { device } = $props();

    import Field from "$lib/components/schedule/weektablecolumnpopulator.svelte";
</script>

<div class="schedule-week-schema-row">
    <div class="schedule-week-schema-row-device">{device.name}</div>
    <!-- Should execute 7 times for each day of the week -->
    <!-- column contains a collection of timeslots/feilds -->
    {#each device.fields as column}
        <Field fields={column} />
    {/each}
    <!-- <Field fields={device.fields[0]}/>
    <Field fields={device.fields[1]}/>
    <Field fields={device.fields[2]}/>
    <Field fields={device.fields[3]}/>
    <Field fields={device.fields[4]}/>
    <Field fields={device.fields[5]}/>
    <Field fields={device.fields[6]}/> -->
</div>
