<script>
    let { name="file" } = $props();
    let supportedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "video/mp4"];
</script>

<label for="image">Choose an image</label>
<input type="file" id="image" name={name} accept={supportedTypes} />
