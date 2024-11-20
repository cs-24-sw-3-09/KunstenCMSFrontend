<script>
    let { doClose, doSubmit } = $props();

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import HiddenTextInput from "$lib/components/modal/hiddentextinput.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import Button from "$lib/components/modal/button.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit Profile" />
        <form action="#" id="modal-form" onsubmit={doSubmit}>
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
