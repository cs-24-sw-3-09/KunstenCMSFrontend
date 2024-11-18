<script>
    let { title, placeholder, name, min, max, step, required, subscript, value } = $props();
</script>

<div>
    <label for={name + "_id"}>{title}</label>
    <input type="number" id={name + "_id"} name={name} min={min} max={max} step={step} placehodler={placeholder} required={required} value={value} />
    <div class="subscript">{subscript}</div>
</div>
