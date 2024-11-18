<script>

import TimeslotModal from '$lib/components/modal/addtimeslot.svelte';
    import { onMount } from 'svelte';
    
    let showTestModal = false;

    onMount(() => {
        showTestModal = true;
    });


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

<button onclick={toggleTestModal} class="gallery-header-upload-button">Add Timeslot</button>

{#if showTestModal}
    <TimeslotModal doClose={toggleTestModal} doSubmit={submitTestModal}/>
{/if}

<style>
    @import "$lib/styles/modal.css";
</style>