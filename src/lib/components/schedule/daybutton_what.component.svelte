<script>
    import AddModal from '$lib/components/schedule/newtimeslotmodal.svelte';
    
    let showAddModal = false;

    function toggleAddModal() {
        showAddModal = !showAddModal;
    }

</script>

<button onclick={toggleAddModal}>Add Timeslot</button>

{#if showAddModal}
    <AddModal doClose={toggleAddModal} />
{/if}

<style>
    @import "$lib/styles/button.css";
</style>


