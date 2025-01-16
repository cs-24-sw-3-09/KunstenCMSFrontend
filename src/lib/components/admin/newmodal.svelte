<script>
    let { doClose, updateUsersData } = $props();
    let submitButtonDisabled = $state(false);

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
    import Checkbox from "$lib/components/modal/checkbox.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import HiddenTextInput from "$lib/components/modal/hiddentextinput.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit User" />

        <form method="post" action="?/newUser"
        use:enhance={({}) => {
submitButtonDisabled = true;
            return async ({ result }) => {
                // `result` is an `ActionResult` object
                switch (result.type) {
                    case "failure":
                        // Handle the error
                        alert(`Failed to add new user, please reload page (F5).\n${result.data?.error}`,);
                        break;
                    case "success":
                        updateUsersData(result.data.usersData.content);
                        closeModal(); // Call doClose on successful form submission
                        break;
                }
            };
        }}>
            <TextInput
                title={"First Name"}
                placeholder={"First Name Here"}
                name={"firstName"}
                required="true"
            />
            <TextInput
                title={"Last Name"}
                placeholder={"Last Name Here"}
                name={"lastName"}
                required="true"
            />
            <TextInput
                title={"E-mail"}
                placeholder={"E-mail Here"}
                name={"email"}
                required="true"
            />

            <Separator />

            <Smallheader text="Remember this:" />

            <HiddenTextInput
                title={"Password"}
                placeholder={"Password Here"}
                name={"password"}
                required="true"
            />

            <Separator />

            <Checkbox
                title={"Receive Notifications"}
                name={"notificationState"}
                checked={false}
            />

            <Separator />

            <Smallheader text="Roles:" />

            <Checkbox
                title={"Media Planner"}
                name={"mediaPlanner"}
                checked={false}
            />
            <Checkbox title={"Admin"} name={"admin"} checked={false} />

            <div class="modal-buttons">
                <Button
                    type="button"
                    text="Cancel"
                    doFunc={doClose}
                    extra_class={"modal-button-close"}
                />
                <Button
                disabled = {submitButtonDisabled}
                    type="submit"
                    text="Submit"
                    extra_class={"modal-button-submit"}
                />
            </div>
        </form>
    </div>
</div>
