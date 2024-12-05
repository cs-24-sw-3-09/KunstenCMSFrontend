<script>

let {title, name, required, value } = $props();

</script>
<div class="modal-textinput">
    <label for={name+"_id"}>{title ? title: "Time:"}</label>
    <input type="time" id={name+"_id"} name={name} required={required} value = {value} />
</div>