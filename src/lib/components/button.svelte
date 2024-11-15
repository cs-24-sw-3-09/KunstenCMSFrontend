<script>
  let { text, clickFunction } = $props();
</script>

<button onclick={clickFunction}>{text}</button>

<style>
    @import "$lib/styles/button.css";
</style>