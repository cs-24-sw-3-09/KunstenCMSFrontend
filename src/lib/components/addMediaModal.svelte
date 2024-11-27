<script>
    let { doClose, doSubmit } = $props();

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
        <Header text="Add new media" />
        
        <form action="#" id="modal-form" onsubmit={doSubmit}>

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
