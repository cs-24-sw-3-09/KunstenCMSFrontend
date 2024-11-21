<script>
    import DropdownElement from "$lib/components/modal/dropdownElement.svelte";
  
    export let selectedValue;
    export let items;
  
    const handleSelect = (value) => {
      selectedValue = value;
    };
  </script>
  
  <div>
    <button>{selectedValue || "Select an item"}</button>
    <ul>
      {#each items as item}
        <DropdownElement {item} on:select={e => handleSelect(e.detail)} />
      {/each}
    </ul>
  </div>