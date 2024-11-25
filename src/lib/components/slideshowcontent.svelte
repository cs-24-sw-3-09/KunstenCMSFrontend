<script>
    let props = $props();

    let content = props.content;

    console.log(content);

    let status = "flex";

    
</script>

<div class="slideshows-item-body">
    <div class="slideshows-body-line"></div>
    <div class="slideshows-body-list" style="--theme-show: {status}">
        <div draggable="true" class="slideshows-body-item">
            <div class="slideshows-body-item-preview">
                <img
                    src="http://152.53.110.114:8080/files/{content.visualMedia.location}"
                    alt=""
                />
            </div>
            <div class="slideshows-body-item-num">
                {content.slideshowPosition}
            </div>
            <div class="slideshows-body-item-title">
                {content.visualMedia.name}
            </div>
            <div class="slideshows-body-item-settings">
                <div class="slideshows-body-item-duration">
                    <div class="slideshows-body-item-duration-icon">
                        <i class="fa-regular fa-clock"></i>
                    </div>
                    <div class="slideshows-body-item-duration-title">
                        Duration:
                    </div>
                    <div class="slideshows-body-item-duration-input">
                        <input type="text" value={content.slideDuration} />
                    </div>
                </div>
            </div>
            <div class="slideshows-body-item-actions">
                <div class="slideshows-body-item-action-trash">
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div class="slideshows-body-item-action-hand">
                    <i class="fa-solid fa-hand"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .slideshows-body-list {
        display: var(--theme-show);
        gap: 4px;
        flex-direction: column;
    }

    .timeslot {
        color: rgb(22, 22, 22);
        height: 100%;
        background-color: var(--theme-bgcolor);
        left: var(--theme-left);
        width: var(--theme-right);
    }
</style>
