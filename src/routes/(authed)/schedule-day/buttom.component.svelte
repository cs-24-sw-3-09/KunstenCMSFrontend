<script>
    import AddModal from '$lib/components/dayaddtimeslotmodal.svelte';
    
    let showAddModal = false;

    function toggleAddModal() {
        showAddModal = !showAddModal;
    }

    function submitAddModal(event) {
        console.log(event.target);
        event.preventDefault();
        let form = new FormData(event.target);
        console.log(form.get("")
        );
        toggleAddModal();
    }

</script>

<button onclick={toggleAddModal}>Add Timeslot</button>

{#if showAddModal}
    <AddModal doClose={toggleAddModal} doSubmit={submitAddModal}/>
{/if}




