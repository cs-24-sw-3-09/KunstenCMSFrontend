<script>
    let { type, text, doFunc, extra_class, disabled = false } = $props();
</script>

<button type={type} class="modal-button {extra_class} {disabled ? 'disabled' : ''}" onclick={doFunc} disabled={disabled}>{text}</button>

<style>
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>