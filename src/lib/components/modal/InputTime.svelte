<script>

let {title, name, required } = $props();

</script>
<div class="modal-textinput">
    <label for={name+"_id"}>{title ? title: "Time:"}</label>
    <input type="time" id={name+"_id"} name={name} required={required} />
</div>