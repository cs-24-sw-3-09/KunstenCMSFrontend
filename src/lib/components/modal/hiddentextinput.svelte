<script>
    let { title, placeholder, name, required, value, minlength=null } = $props();
</script>

<div class="modal-textinput">
    <label for={name+"_id"}>{title}</label>
    <input type="password" id={name+"_id"} name={name} placeholder={placeholder} required={required} value={value} minlength={minlength} />
</div>
