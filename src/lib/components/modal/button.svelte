<script>
    let { type, text, doFunc, extra_class } = $props();
</script>

<button type={type} class="modal-button {extra_class}" onclick={doFunc}>{text}</button>