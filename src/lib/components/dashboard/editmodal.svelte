<script>
    let { doClose, device, updateDevices } = $props();

    // Import the "enhance" function from the "form" module.
    import { enhance } from "$app/forms";
    import { env } from "$env/dynamic/public";
    import { getCookie } from "$lib/utils/getcookie.js";
    
    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import SmallHeader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Numberinput from "$lib/components/modal/numberinput.svelte";
    import Dropdown from "$lib/components/modal/dropdown.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import { onMount } from "svelte";

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    }

    let options = $state([]);

    onMount(async () => {

        const authToken = getCookie("authToken");

        let visualMediaFetch = await fetch(
          env.PUBLIC_API_URL + "/api/visual_medias/all",
          {
            headers: { Authorization: "Bearer " + authToken },
          },
        );

        let visualMedias = await visualMediaFetch.json();
        visualMedias?.forEach(visualMedia => {
            options.push({id: visualMedia.id, name: visualMedia.name, type: "visualMedia"});
        });

        let slideshowsFetch = await fetch(
          env.PUBLIC_API_URL + "/api/slideshows",
          {
            headers: { Authorization: "Bearer " + authToken },
          },
        );

        let slideshows = await slideshowsFetch.json();
        slideshows?.forEach(slideshow => {
            options.push({id: slideshow.id, name: slideshow.name, type: "slideshow"});
        });

    });

    console.log(device.fallbackContent.name);
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit Device" />

        <form method="post" action="?/editDevice"
        use:enhance={({ formData }) => {
            // `formData` is its `FormData` object that's about to be submitted
            formData.set("id", device.id);
            formData.set("oldData", JSON.stringify(device)); // Pass previous known user data to the action
            return async ({ result }) => {
                // `result` is an `ActionResult` object
                switch (result.type) {
                    case "failure":
                        alert(`Failed to edit display device, please reload page (F5).\n${result.data?.error}`);
                        break;
                    case "success":
                        updateDevices(result.data.responseData);
                        closeModal(); // Call doClose on successful form submission
                        break;
                }
            };
        }}>
            <TextInput title={"Name"} placeholder={"Name of device here"} name={"name"} required="true" value={device.name} />
            <TextInput title={"Location"} placeholder={"Location of device here"} name={"location"} required="true" value={device.location} />

            <div class="modal-dropdown">
                <label for={"fallback_id"}>{"Fallback"}</label>
                <select id={"fallback_id"} name={"fallbackContent"} required>
                    {#each options as option}
                        {#if device.fallbackContent.id == option.id}
                            <option selected value={JSON.stringify(option)}>{option.type === "visualMedia" ? "Media" : "Slideshow"}: {option.name}</option>   
                        {:else}
                            <option value={JSON.stringify(option)}>{option.type === "visualMedia" ? "Media" : "Slideshow"}: {option.name}</option>
                        {/if}
                    {/each}
                </select>
            </div>

            <!-- <TextInput title={"Model"} placeholder={"Model of device here"} name={"model"} required="true" value={device.model} /> -->

            <SmallHeader text={"Horizontal resolution"} />

            <div class="modal-inline">
                <!-- MAX values are overtly large -->
                <Numberinput title={"Width"} placeholder={"x"} name={"width"} min={1} max={122880} step={1} required={true} subscript={"px"} value={device.resolution.split("x")[0]} />
                <Numberinput title={"Height"} placeholder={"y"} name={"height"} min={1} max={122880} step={1} required={true} subscript={"px"} value={device.resolution.split("x")[1]} />
            </div>

            <Dropdown title={"Display Orientation"} name={"displayOrientation"} options={["horizontal", "vertical"]} value={device.displayOrientation} required="true" />

            

            <Separator />

            <div class="modal-buttons">
                <Button type="button" text="Cancel" doFunc={doClose} extra_class={"modal-button-close"} />
                <Button type="submit" text="Submit" extra_class={"modal-button-submit"} />
            </div>
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
