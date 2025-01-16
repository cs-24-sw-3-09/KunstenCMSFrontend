<script>
    let { type, text, doFunc, extra_class, disabled = false } = $props();
</script>

<button type={type} class="modal-button {extra_class}" onclick={doFunc} disabled={disabled}>{text}</button>