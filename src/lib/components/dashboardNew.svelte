<script>
    let { doClose, doSubmit, options } = $props();

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Numberinput from "$lib/components/modal/numberinput.svelte";
    import Dropdown from "$lib/components/modal/dropdown.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="New Device" />
        
        <form action="#" id="modal-form" onsubmit={doSubmit}>

            <TextInput title={"Name"} placeholder={"Name of device here"} name={"name"} required="true" />
            <TextInput title={"Location"} placeholder={"Location of device here"} name={"location"} required="true" />

            <Dropdown title={"Fallback"} name={"fallback"} options={options} />
            
            <div class="modal-inline">
                <!-- MAX values are overtly large -->
                <Numberinput title={"Width"} placeholder={"x"} name={"width"} min={1} max={122880} step={1} required={true} subscript={"px"} />
                <Numberinput title={"Height"} placeholder={"y"} name={"height"} min={1} max={122880} step={1} required={true} subscript={"px"} />
            </div>

            <Separator />

            <div class="modal-buttons">
                <Button type="button" text="Cancel" doFunc={doClose} extra_class={"modal-button-close"} />
                <Button type="submit" text="Submit" extra_class={"modal-button-submit"} />
            </div>
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
