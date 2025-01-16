<script>
    let { type, text, doFunc, extra_class, disabled = false, formID = undefined } = $props();
</script>


{#if formID != undefined }
    <button form={formID} type={type} class="modal-button {extra_class} {disabled ? 'disabled' : ''}" onclick={doFunc} disabled={disabled}>{text}</button>
{:else}
    <button type={type} class="modal-button {extra_class} {disabled ? 'disabled' : ''}" onclick={doFunc} disabled={disabled}>{text}</button>
{/if}


<style>
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>