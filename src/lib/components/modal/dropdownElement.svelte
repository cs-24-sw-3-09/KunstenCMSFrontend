<script>
    import { createEventDispatcher } from 'svelte';
  
    export let item;
    const dispatch = createEventDispatcher();
  
    const handleClick = () => {
      dispatch('select', item);
    };
  </script>
  
  <li>
    <button on:click={handleClick}>{item}</button>
  </li>