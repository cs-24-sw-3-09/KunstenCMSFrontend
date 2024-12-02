<script>
    let { doClose, profileData } = $props();

    import { enhance } from '$app/forms';

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    }

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import HiddenTextInput from "$lib/components/modal/hiddentextinput.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import Button from "$lib/components/modal/button.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Change Password" />

        <form action="?/changePassword" id="modal-form" method="post" 
        use:enhance={({ formData }) => {
            // `formData` is its `FormData` object that's about to be submitted
            formData.set("id", profileData.id);
            
            return async ({ result }) => {
                switch (result.type) {
                    case "failure":
                        alert(`Failed to update password, please reload page (F5).\n${result.data?.error}`);
                        break;
                    case "success":
                        closeModal(); // Call doClose on successful form submission
                        break;
                }

            };
        }}>

            <HiddenTextInput title={"New Password"} placeholder={"New password here"} name={"password"} required="true" />
            <HiddenTextInput title={"Confirm New Password"} placeholder={"Rewrite password here"} name={"confpassword"} required="true" />
            
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
