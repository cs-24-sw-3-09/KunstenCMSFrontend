<script>
    let { doClose, profileData, updateProfileData } = $props();

    import { enhance } from '$app/forms';

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    }

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

        <form action="?/editProfile" id="modal-form" method="post" 
        use:enhance={({ formData }) => {
            // `formData` is its `FormData` object that's about to be submitted
            formData.set("id", profileData.id);
            formData.set("oldData", JSON.stringify(profileData)); // Pass previous known user data to the action
            
            return async ({ result }) => {
                switch (result.type) {
                    case "failure":
                        alert(`Failed to update profile, please reload page (F5).\n${result.data?.error}`);
                        break;
                    case "success":
                        updateProfileData(result.data.responseData);
                        closeModal(); 
                        break;
                }
            };
        }}>
            <TextInput title={"First Name"} placeholder={"First name here"} name={"firstName"} required="true" value={profileData.firstName} />
            <TextInput title={"Last Name"} placeholder={"Last name here"} name={"lastName"} required="true" value={profileData.lastName} />
            <TextInput title={"E-mail"} placeholder={"E-mail here"} name={"email"} required="true" value={profileData.email} />
            
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
