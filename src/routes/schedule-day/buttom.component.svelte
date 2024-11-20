<script>
    import TimeslotModal from "$lib/components/modal/addtimeslot.svelte";

    let showTestModal = $state(false);

    function toggleTestModal() {
        showTestModal = !showTestModal;
    }

    function submitTestModal(event) {
        event.preventDefault();
        const form = event.target;
        console.log(form);
        const data = new FormData(form);
        console.log(data);
        toggleTestModal();
    }

    function checkSelectedDays() {
        const selectedDays = Object.keys(days).filter((day) => days[day]);
        console.log("Selected Days:", selectedDays);
    }
</script>

<button onclick={toggleTestModal} class="gallery-header-upload-button"
    >Add Timeslot</button
>

{#if showTestModal}
    <TimeslotModal  doClose={toggleTestModal} doSubmit={submitTestModal} />
{/if}

<style>
    @import "$lib/styles/modal.css";
</style>
