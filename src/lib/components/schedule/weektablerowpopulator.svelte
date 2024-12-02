<script>
    let { device } = $props();

    import Field from "$lib/components/schedule/weektablecolumnpopulator.svelte";
</script>

<div class="schedule-week-schema-row">
    <div class="schedule-week-schema-row-device">{device.name}</div>
    <!-- column contains a collection of timeslots/feilds -->    
    {#each {length: 9-device.fields.length} as _, day}
        <Field fields={device.fields[day]} />  
    {/each}
    <!-- <Field fields={device.fields[0]}/>
    <Field fields={device.fields[1]}/>
    <Field fields={device.fields[2]}/>
    <Field fields={device.fields[3]}/>
    <Field fields={device.fields[4]}/>
    <Field fields={device.fields[5]}/>
    <Field fields={device.fields[6]}/> -->
</div>
