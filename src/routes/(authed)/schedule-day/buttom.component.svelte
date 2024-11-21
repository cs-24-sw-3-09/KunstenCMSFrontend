<script>
    import Testmodal from '$lib/components/modal/addtimeslot.svelte';
    
    let showTestModal = false;

    function toggleTestModal() {
        showTestModal = !showTestModal;
    }

    function submitTestModal(event) {
        console.log(event.target);
        event.preventDefault();
        let form = new FormData(event.target);
        console.log(form.get("")
        );
        //toggleTestModal();
    }

</script>

<button onclick={toggleTestModal} 
    >Add Timeslot</button
>

{#if showTestModal}
    <Testmodal doClose={toggleTestModal} doSubmit={submitTestModal}/>
{/if}




