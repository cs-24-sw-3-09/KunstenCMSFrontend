<script>

    let props = $props();

    import Field from "./screenField_component.svelte"


</script>

<div class="schedule-week-schema-row">
    <div class="schedule-week-schema-row-device">{props.device.name}</div>
    <Field fields={props.device.fields[0]}/>
    <Field fields={props.device.fields[1]}/>
    <Field fields={props.device.fields[2]}/>
    <Field fields={props.device.fields[3]}/>
    <Field fields={props.device.fields[4]}/>
    <Field fields={props.device.fields[5]}/>
    <Field fields={props.device.fields[6]}/>

</div>

