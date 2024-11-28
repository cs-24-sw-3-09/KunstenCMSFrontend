<script>
    let { name="file" } = $props();
</script>

<label for="image">Choose an image</label>
<input type="file" id="image" name={name} accept="image/*" />
