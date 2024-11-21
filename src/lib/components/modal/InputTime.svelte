<script>

let { title, placeholder, name, required, value } = $props();

</script>

<label for={name+"_id"}>Time:</label>
<input type="time" id={name+"_id"} name={name} required={required} value={value} />