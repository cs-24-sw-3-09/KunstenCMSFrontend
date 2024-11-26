<script>
    let { doClose, doSubmit } = $props();

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Smallheader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
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
        <Header text="Edit User" />

        <form action="#" id="modal-form" onsubmit={doSubmit}>

            <TextInput title={"First Name"} placeholder={"First Name Here"} name={"firstName"} required="true" />
            <TextInput title={"Last Name"} placeholder={"Last Name Here"} name={"lastName"} required="true" />
            <TextInput title={"E-mail"} placeholder={"E-mail Here"} name={"email"} required="true" />
            
            <Separator />
            
            <TextInput title={"Password"} placeholder={"New Password Here"} name={"email"} required="true" />
            
            <Separator />

            <Checkbox title={"Receive Notifications"} name={"notificationState"} checked={false} />
            
            <Separator />
            
            <Smallheader text="Roles:" />
            
            <Checkbox title={"Media Planner"} name={"mediaPlanner"} checked={false} />
            <Checkbox title={"Admin"} name={"admin"} checked={false} /> 

            <div class="modal-buttons">
                <Button type="button" text="Cancel" doFunc={doClose} extra_class={"modal-button-close"} />
                <Button type="submit" text="Submit" extra_class={"modal-button-submit"} />
            </div>
        </form>
    </div>
</div>