<script>

let {name, required } = $props();

</script>

<label for={name+"_id"}>Time:</label>
<input type="time" id={name+"_id"} name={name} required={required} />