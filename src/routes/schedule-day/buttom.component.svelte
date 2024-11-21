<script>
    import Testmodal from '$lib/components/modal/addtimeslot.svelte';
    
    let showTestModal = false;

    function toggleTestModal() {
        showTestModal = !showTestModal;
    }

    function submitTestModal(event) {
        event.preventDefault();
        let form = new FormData(event.target);
        console.log(form);
        toggleTestModal();
    }

</script>

{#if showTestModal}
    <Testmodal doClose={toggleTestModal} doSubmit={submitTestModal}/>
{/if}

<style>
    @import "$lib/styles/page.css";
    @import "$lib/styles/tooptip.css";
</style>

<button onclick={toggleTestModal} class="gallery-header-upload-button"
    >Add Timeslot</button
>

