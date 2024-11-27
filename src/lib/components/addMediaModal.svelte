<script>
    let { doClose, doSubmit, Item } = $props();

    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import MediaItem from "$lib/components/modal/mediaItem.svelte";


    var selectedId = $state(null);

    function updateState(id) {
        selectedId = (id == selectedId ? id : id);
    }
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="add-media-modal active">
    <div class="add-media-modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Add new media" />

        <form action="#" id="modal-form" onsubmit={doSubmit}>
            <!-- <TextInput title={"Name"} placeholder={"Name of slideshow"} name={"name"} required="true" /> -->

            <div class="add-media-modal-list">
                {#each Item as item}
                    <MediaItem item = {item}  selectedId = {selectedId} on:update={(event) => updateState(event.detail)} />
                {/each}
            </div>

            <div class="modal-buttons">
                <Button
                    type="button"
                    text="Cancel"
                    doFunc={doClose}
                    extra_class={"modal-button-close"}
                />
                <Button
                    type="submit"
                    text="Submit"
                    extra_class={"modal-button-submit"}
                />
            </div>
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
