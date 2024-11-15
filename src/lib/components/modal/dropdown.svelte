<script>
    let { title, name, options, selected } = $props();
</script>

<div class="modal-dropdown">
    <label for={name + "_id"}>{title}</label>
    <select id={name + "_id"} {name} required>
        {#each options as option}
            <option value={option}>{option} {selected === option ? "selected" : ""}</option>
        {/each}
    </select>
</div>
