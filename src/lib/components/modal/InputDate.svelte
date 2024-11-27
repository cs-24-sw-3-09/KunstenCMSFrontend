<script>
    // Declare variables for the date and time
    let { title, placeholder, name, required, value } = $props();
</script>

<label for={name + "_id"}>{title ? title : "Date:"}</label>
<input type="date" id={name + "_id"} {name} {placeholder} {required} {value} />
