<script>
    let { doClose, doSubmit } = $props();

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Smallheader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Numberinput from "$lib/components/modal/numberinput.svelte";
    import Dropdown from "$lib/components/modal/dropdown.svelte";
    import Checkbox from "$lib/components/modal/checkbox.svelte";
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
        <Header text="Test Modal" />
        <form action="#" id="modal-form" onsubmit={doSubmit}>
            <Smallheader text="Test Header:" />

            <TextInput title={"Test Text"} placeholder={"Type your text here"} name={"text1"} required="true" value={""} />
            <TextInput title={"Test Text2"} placeholder={"Typing here is not required"} name={"text2"} value={"´hello"} />

            <Separator />

            <Dropdown title={"Test Dropdown"} name={"dropdown1"} options={["Option 1", "Option 2", "Option 3"]} selected={"Option 1"} />

            <Separator />

            <Smallheader text="Test Checkbox:" />

            <Checkbox title={"Test Checkbox"} name={"checkbox1"} checked={false} />
            <Checkbox title={"Test Checkbox2"} name={"checkbox2"} checked={true} />

            <Separator />

            <Smallheader text="Test Number Input:" />

            <div class="modal-inline">
                <Numberinput title={"x dim"} placeholder={""} name={"x"} min={1} max={99999} step={2} required={true} subscript={"px"} value={1} />
                <Numberinput title={"y dim"} placeholder={"y"} name={"y"} min={0} max={99999} step={1} required={false} subscript={"px"} value={0} />
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
