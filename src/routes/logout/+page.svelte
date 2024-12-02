<script>
    let { form } = $props();
</script>

<form method="POST" action="?/logout" use:enhance>
    <button type="submit">Logout</button>
</form>