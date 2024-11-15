<script>
    import Testmodal from '$lib/components/modal/testmodal.svelte';
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

<h1>Modal Page</h1>
<button on:click={toggleTestModal}>Show Test Modal</button>

{#if showTestModal}
    <Testmodal doClose={toggleTestModal} doSubmit={submitTestModal}/>
{/if}

<style>
    @import "$lib/styles/page.css";
    @import "$lib/styles/tooptip.css";
</style>