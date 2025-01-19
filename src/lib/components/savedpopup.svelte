<script>
  export let message = "Saved!";
  export let type = "";
  export let duration = 3000;

  let visible = false;

  export function show(newMessage = message, newtype = type) {
    visible = true;
    type = newtype;
    message = newMessage
    setTimeout(() => (visible = false), duration);
  }
</script>

<style>
  .popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 9999;
    color: white;
  }

  .popup.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Success style */
  .popup.success {
    background-color: #4caf50; /* Green */
  }

  /* Error style */
  .popup.error {
    background-color: #f44336; /* Red */
  }
</style>

<div class="popup {type} {visible ? 'visible' : ''}">
  {message}
</div>
