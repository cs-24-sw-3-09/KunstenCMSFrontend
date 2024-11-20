<script>

    // Declare variables for the date and time
    let { type, id, name, value, label } = $props();


</script>

<div>
    <p>From</p>
    <label for={label}>Date:</label>
    <input
        type={type}
        id={id}
        name={name}
        value={value}
    />
</div>
