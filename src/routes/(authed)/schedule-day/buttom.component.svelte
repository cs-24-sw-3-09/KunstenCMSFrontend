<script>
    import Addtimeslot from '$lib/components/modal/addtimeslot.svelte';
    
    let showTestModal = false;

    function toggleAddtimeslotModal() {
        showTestModal = !showTestModal;
    }

    function submitAddtimeslotModal(event) {
        console.log(event.target);
        event.preventDefault();
        let form = new FormData(event.target);
        console.log(form.get("Mon")
        );
        //toggleTestModal();
    }

</script>

    <button onclick={toggleAddModal}>Add Timeslot</button>





{#if showTestModal}
    <Addtimeslot doClose={toggleAddtimeslotModal} doSubmit={submitAddtimeslotModal}/>
{/if}




