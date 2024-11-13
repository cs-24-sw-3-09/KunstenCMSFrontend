<script>
    /* Exporting the onClose function to be used in the parent component */
    let { onClose, onSave } = $props();
</script>

<div class="new-device-modal">
    <div class="new-device-modal-content">
      <div class="new-device-modal-close" onclick={onClose}>
        <i class="fa-solid fa-x"></i>
      </div>
      <div class="new-device-modal-header">Add New Device</div>
      <form id="new-device-modal-form" onsubmit={onSave}>
        <div class="new-device-modal-name">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div class="new-device-modal-location">
          <label for="location">Location</label>
          <input type="text" id="location" name="location" required />
        </div>
        <div class="new-device-modal-fallback">
          <label for="fallback">Fallback Slideshow</label>
          <select id="fallback" name="fallback" required>
            <!-- TODO: Add options from database -->
            <option value="Halloween 2024">Halloween 2024</option>
            <option value="Halloween 2024">Halloween 2023</option>
            <option value="Halloween 2024">Halloween 2022</option>
            <option value="Halloween 2024">Halloween 2021</option>
            <option value="Halloween 2024">Halloween 2020</option>
          </select>
        </div>
        <div class="new-device-modal-dimensions">
          <div>
            <label for="width">Width</label>
            <input type="number" id="width" name="width" required min="1" />
            <div class="px">px</div>
          </div>
          <div>
            <label for="height">Height</label>
            <input type="number" id="height" name="height" required min="1" />
            <div class="px">px</div>
          </div>
        </div>
        <div class="new-device-modal-buttons">
          <button type="button" class="new-device-modal-button new-device-modal-button-cancel" onclick={onClose}>Cancel</button>
          <!-- TODO: Create function -->
          <button type="submit" class="new-device-modal-button new-device-modal-button-create">Create</button>
        </div>
      </form>
    </div>
  </div>