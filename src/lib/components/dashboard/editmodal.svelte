<script>
    let { doClose, options, device } = $props();

    // Import the "enhance" function from the "form" module.
    import { enhance } from '$app/forms';

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    } 

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import SmallHeader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Numberinput from "$lib/components/modal/numberinput.svelte";
    import Dropdown from "$lib/components/modal/dropdown.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit Device" />
        
        <form method="post" action="?/editDevice" 
        use:enhance={({ formData }) => {
            // `formData` is its `FormData` object that's about to be submitted
            formData.set("id", device.id);
            formData.set("oldData", JSON.stringify(device)); // Pass previous known user data to the action
            
            return async ({ result }) => {
                // `result` is an `ActionResult` object              
                if (result.type === "success") {
                    closeModal(); // Call doClose on successful form submission
                }
            };
        }}>

            <TextInput title={"Name"} placeholder={"Name of device here"} name={"name"} required="true" value={device.name} />
            <TextInput title={"Location"} placeholder={"Location of device here"} name={"location"} required="true" value={device.location} />

            <Dropdown title={"Fallback"} name={"fallback"} options={options} selected={device.fallbackVisualMedia.name} required="true" />
            
            <Separator />

            <TextInput title={"Model"} placeholder={"Model of device here"} name={"model"} required="true" value={device.model} />
            
            <SmallHeader text={"Horizontal resolution"} />
            
            <div class="modal-inline">
                <!-- MAX values are overtly large -->
                <Numberinput title={"Width"} placeholder={"x"} name={"width"} min={1} max={122880} step={1} required={true} subscript={"px"} value={device.resolution.split("x")[0]} />
                <Numberinput title={"Height"} placeholder={"y"} name={"height"} min={1} max={122880} step={1} required={true} subscript={"px"} value={device.resolution.split("x")[1]} />
            </div>

            <Dropdown title={"Display Orientation"} name={"displayOrientation"} options={["Horizontal", "Vertical"]} selected={device.fallbackVisualMedia.name} required="true" />
            
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
