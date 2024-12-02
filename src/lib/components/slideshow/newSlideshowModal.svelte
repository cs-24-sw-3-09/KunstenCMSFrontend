<script>
    let { doClose, doSubmit } = $props();

    import { enhance } from "$app/forms";

    function closeModal() {
        doClose();
    }

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
            return async ({ result }) => {
                console.log("Result "+result)
                // `result` is an `ActionResult` object
                if (result.type === "failure") {
                    // Handle the error
                    alert(
                        `Failed to create new slideshow, please reload page (F5).\n${result.data?.error}`,
                    );
                } else if (result.type === "success") {
                    closeModal(); // Call doClose on successful form submission
                }
            };
        }}>

            <TextInput title={"Name"} placeholder={"Name of slideshow"} name={"name"} required="true" />
            
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
