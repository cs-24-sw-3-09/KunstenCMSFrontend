<script>
    let { doClose } = $props();

    // Import the "enhance" function from the "form" module.
    import { enhance } from "$app/forms";

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    }

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

        <!-- enctype="multipart/form-data" is needed for the file upload -->
        <form
            method="post"
            action="?/newVisualMedia"
            enctype="multipart/form-data"
            use:enhance={({}) => {
                return async ({ result }) => {
                    // `result` is an `ActionResult` object
                    if (result.type === "failure") {
                        // Handle the error
                        alert(
                            `Failed to add new visual media, please reload page (F5).\n${result.data?.error}`,
                        );
                    } else if (result.type === "success") {
                        closeModal(); // Call doClose on successful form submission
                    }
                };
            }}
        >

            <!-- <TextInput
                title={"Name"}
                placeholder={"Name here"}
                name={"name"}
                value={""}
                required="true"
            />
            <TextInput
                title={"Description"}
                placeholder={"Description here"}
                name={"description"}
                value={""}
                required="true"
            />

            <Separator />

            <TextInput
                title={"Tags"}
                placeholder={"Format: tag1, art, event3..."}
                name={"tags"}
                value={""}
            />

            <Separator /> -->

            <ImageInput name={"file"} />

            <div class="modal-buttons">
                <Button
                    type="button"
                    text="Cancel"
                    doFunc={doClose}
                    extra_class={"modal-button-close"}
                />
                <Button
                    type="submit"
                    text="Submit"
                    extra_class={"modal-button-submit"}
                />
            </div>
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
