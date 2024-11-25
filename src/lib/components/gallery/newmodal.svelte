<script>
    let { doClose, doSubmit } = $props();

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Smallheader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import ImageInput from "$lib/components/modal/imageinput.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="New Visual Media" />
        <form action="#" id="modal-form" onsubmit={doSubmit}>
            <Smallheader text="About:" />

            <TextInput title={"Name"} placeholder={"Name here"} name={"name"} value={""} required="true" />
            <TextInput title={"Description"} placeholder={"Description here"} name={"desctiption"} value={""} required="true" />

            <Separator />
            
            <TextInput title={"Tags"} placeholder={"Format: tag1, tag2, tag 3"} name={"tags"} value={""} />

            <Separator />

            <ImageInput />

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
