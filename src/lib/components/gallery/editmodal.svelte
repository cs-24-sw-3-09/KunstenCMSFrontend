<script>
    let { doClose, item, updateVisualMedia, saveData } = $props();
    let sumbitButtonDisabled = $state(false);

    // Import the "enhance" function from the "form" module.
    import { enhance } from '$app/forms';

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    } 

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit Visual Media" />
        
        <form method="post" action="?/editVisualMedia"
        use:enhance={({ formData }) => {
            sumbitButtonDisabled = true;
            // `formData` is its `FormData` object that's about to be submitted
            formData.set("id", item.id);
            formData.set("oldData", JSON.stringify(item)); // Pass previous known user data to the action
            
            return async ({ result }) => {
                switch (result.type) {
                    case "failure":
                        alert(`Failed to update visual media, please reload page (F5).\n${result.data?.error}`);
                        sumbitButtonDisabled = false;
                        saveData(false);
                        break;
                    case "success":
                        saveData(true);
                        updateVisualMedia(result.data.responseData);
                        doClose(); // Call doClose on successful form submission
                        break;
                }
            };
        }}>
            <TextInput title={"Name"} placeholder={"Name here"} name={"name"} value={item.name} required="true" />
            <div class="modal-textinput">
                <label class="modal-label" for="description_id">Description</label>
                <textarea rows="4" name="description" id="description_id" placeholder="Description here">{item.description}</textarea>
            </div>
            <Separator />

            <div class="modal-buttons">
                <Button type="button" text="Cancel" doFunc={doClose} extra_class={"modal-button-close"} />
                <Button disabled = {sumbitButtonDisabled} type="submit" text="Submit" extra_class={"modal-button-submit"} />
            </div>
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
