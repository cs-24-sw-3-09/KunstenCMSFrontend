<script>
    let { doClose, allContent, updateSlideshowContent, saveData } = $props();
    let sumbitButtonDisabled = $state(false);

    import { enhance } from "$app/forms";

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Button from "$lib/components/modal/button.svelte";
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
        <Header text="New Slideshow" />
        
        <form method="POST" action="?/postNewSlideshow" use:enhance={({}) => {
            sumbitButtonDisabled = true;
            return async ({ result }) => {
                // `result` is an `ActionResult` object
                if (result.type === "failure") {
                    // Handle the error
                    alert(
                        `Failed to create new slideshow, please reload page (F5).\n${result.data?.error}`,
                    );
                    saveData(false);
                } else if (result.type === "success") {
                    doClose();
                    updateSlideshowContent(result.data.newData);
                    saveData(true);
                }
            };
        }}>

            <TextInput title={"Name"} placeholder={"Name of slideshow"} name={"name"} required="true" />
            
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
