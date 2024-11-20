<script>
    let { doClose, doSubmit, user } = $props();

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import Button from "$lib/components/modal/button.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit Profile" />
        <form action="#" id="modal-form" onsubmit={doSubmit}>
            <TextInput title={"First Name"} placeholder={"First name here"} name={"firstName"} required="true" value={user.firstName} />
            <TextInput title={"Last Name"} placeholder={"Last name here"} name={"lastName"} required="true" value={user.lastName} />
            <TextInput title={"E-mail"} placeholder={"E-mail here"} name={"email"} required="true" value={user.email} />
            
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
