<script>
    let { doClose, options } = $props();

    // Import the "enhance" function from the "form" module.
    import { enhance } from "$app/forms";

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import SmallHeader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Numberinput from "$lib/components/modal/numberinput.svelte";
    import Dropdown from "$lib/components/modal/dropdown.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";    

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    }
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="New Device" />

        <form method="post" action="?/newDevice"
        use:enhance={({ formData }) => {
            // `formData` is its `FormData` object that's about to be submitted
            /* formData.set("fallbackContent", options.filter(option => option.id == formData.get("fallbackContent"))[0]);
            console.log(formData); */

            return async ({ result }) => {
                switch (result.type) {
                    case "failure":
                        alert(`Failed to add display device, please reload page (F5).\n${result.data?.error}`);
                        break;
                    case "success":
                        closeModal(); // Call doClose on successful form submission
                        break;
                }
            };
        }}>
            <TextInput title={"Name"} placeholder={"Name of device here"} name={"name"} required="true" />
            <TextInput title={"Location"} placeholder={"Location of device here"} name={"location"} required="true" />

            <!-- <Dropdown title={"Fallback"} name={"fallback"} {options} /> -->
            
            <div class="modal-dropdown">
                <label for={"fallback_id"}>{"Fallback"}</label>
                <select id={"fallback_id"} name={"fallbackContent"} required>
                    {#each options as option}
                        <option value={`{"id": ${option.id}, "type": "${option.type}"}`}>{option.type === "visualMedia" ? "Media" : "Slideshow"}: {option.name}</option>
                    {/each}
                </select>
            </div>

            <TextInput title={"Model"} placeholder={"Model of device here"} name={"model"} required="true" />

            <SmallHeader text={"Horizontal resolution"} />

            <div class="modal-inline">
                <!-- MAX values are overtly large -->
                <Numberinput title={"Width"} placeholder={"x"} name={"width"} min={1} max={122880} step={1} required={true} subscript={"px"} />
                <Numberinput title={"Height"} placeholder={"y"} name={"height"} min={1} max={122880} step={1} required={true} subscript={"px"} />
            </div>

            <Dropdown title={"Display Orientation"} name={"displayOrientation"} options={["Horizontal", "Vertical"]} required="true" />

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
