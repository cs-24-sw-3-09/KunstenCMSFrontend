<script>
    let { doClose, item, updateVisualMedia } = $props();

    // Import the "enhance" function from the "form" module.
    import { enhance } from '$app/forms';

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    } 

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import MediaInput from "$lib/components/modal/mediainput.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Replace with Visual Media" />
        
        <!-- enctype="multipart/form-data" is needed for the file upload -->
        <form method="post" action="?/replaceVisualMedia" enctype="multipart/form-data"
        use:enhance={({ formData }) => {
            // `formData` is its `FormData` object that's about to be submitted
            formData.set("id", item.id);
            /* formData.set("oldData", JSON.stringify(item)); */ // Pass previous known user data to the action
            
            return async ({ result }) => {
                switch (result.type) {
                    case "failure":
                        alert(`Failed to update visual media, please reload page (F5).\n${result.data?.error}`);
                        break;
                    case "success":
                        updateVisualMedia(result.data.responseData);
                        closeModal(); // Call doClose on successful form submission
                        break;
                }
            };
        }}>
            <MediaInput name={"file"} />

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
