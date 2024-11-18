<script>
    let { title, name, checked } = $props();
</script>

<div>
    <input type="checkbox" id={name+"_id"} name={name} checked={checked ? "checked" : ""} />
    <label for={name+"_id"}>{title}</label>
</div>