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
    import InputTime from "$lib/components/modal/InputTime.svelte";
    import { onMount } from "svelte";

    // Hacky way call doClose() to close the modal because of progressive enhancement "enhance" context window
    function closeModal() {
        doClose();
    }

    let options = $state([]);
    let sumbitButtonDisabled = $state(false);

    onMount(async () => {
        const authToken = getCookie("authToken");

        let slideshowsFetch = await fetch(
            env.PUBLIC_API_URL + "/api/slideshows",
            {
                headers: { Authorization: "Bearer " + authToken },
            },
        );

        let slideshows = await slideshowsFetch.json();
        slideshows?.forEach((slideshow) => {
            options.push({
                id: slideshow.id,
                name: slideshow.name,
                type: "slideshow",
            });
        });

        let visualMediaFetch = await fetch(
            env.PUBLIC_API_URL + "/api/visual_medias/all",
            {
                headers: { Authorization: "Bearer " + authToken },
            },
        );

        let visualMedias = await visualMediaFetch.json();
        visualMedias?.forEach(visualMedia => {
            if(visualMedia.fileType !== "video/mp4"){
                options.push({id: visualMedia.id, name: visualMedia.name, type: "visualMedia"});
            }
        });
    });
</script>

<div class="edit-device-modal">
    <div class="edit-device-modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit Device" />

        <form
            method="post"
            action="?/editDevice"
            use:enhance={({ formData }) => {
                sumbitButtonDisabled = true;
                // `formData` is its `FormData` object that's about to be submitted
                formData.set("id", device.id);
                formData.set("oldData", JSON.stringify(device)); // Pass previous known user data to the action
                return async ({ result }) => {
                    // `result` is an `ActionResult` object
                    switch (result.type) {
                        case "failure":
                            alert(
                                `Failed to edit display device, please reload page (F5).\n${result.data?.error}`,
                            );
                            sumbitButtonDisabled = false;
                            break;
                        case "success":
                            updateDevices(result.data.responseData);
                            closeModal(); // Call doClose on successful form submission
                            break;
                    }
                };
            }}
        >
        <div class="edit-device-modal-top">
        <div class="edit-device-modal-left">
            <TextInput
                title={"Name"}
                placeholder={"Name of device here"}
                name={"name"}
                required="true"
                value={device.name}
            />
            <TextInput
                title={"Location"}
                placeholder={"Location of device here"}
                name={"location"}
                required="true"
                value={device.location}
            />

            <div class="modal-dropdown">
                <label for={"fallback_id"}>{"Fallback"}</label>
                <select id={"fallback_id"} name={"fallbackContent"}>
                    {#if device.fallbackContent == null}
                        <option selected value={null}>No fallback</option>
                    {:else}
                        <option value={null}>No fallback</option>
                    {/if}
                    {#each options as option}
                        {#if device.fallbackContent !== null && device.fallbackContent.id == option.id}
                            <option selected value={JSON.stringify(option)}
                                >{option.type === "visualMedia"
                                    ? "Media"
                                    : "Slideshow"}: {option.name}</option
                            >
                        {:else}
                            <option value={JSON.stringify(option)}
                                >{option.type === "visualMedia"
                                    ? "Media"
                                    : "Slideshow"}: {option.name}</option
                            >
                        {/if}
                    {/each}
                </select>
            </div>

            <!-- <TextInput title={"Model"} placeholder={"Model of device here"} name={"model"} required="true" value={device.model} /> -->


            <div class="modal-inline">
                <!-- MAX values are overtly large -->
                <Numberinput
                    title={"Width"}
                    placeholder={"x"}
                    name={"width"}
                    min={1}
                    max={122880}
                    step={1}
                    required={true}
                    subscript={"px"}
                    value={device.resolution.split("x")[0]}
                />
                <Numberinput
                    title={"Height"}
                    placeholder={"y"}
                    name={"height"}
                    min={1}
                    max={122880}
                    step={1}
                    required={true}
                    subscript={"px"}
                    value={device.resolution.split("x")[1]}
                />
            </div>

            <Dropdown title={"Display Orientation"} name={"displayOrientation"} options={["horizontal", "vertical"]} value={device.displayOrientation} required="true" />
        </div>
        <div class="edit-device-modal-right">
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Monday start"}
                    name={"monday_start"}
                    required={false}
                    value={device.monday_start}
                />
                <InputTime
                    title={"Monday end"}
                    name={"monday_end"}
                    required={false}
                    value={device.monday_end}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Tuesday start"}
                    name={"tuesday_start"}
                    required={false}
                    value={device.tuesday_start}
                />
                <InputTime
                    title={"Tuesday end"}
                    name={"tuesday_end"}
                    required={false}
                    value={device.tuesday_end}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Wednesday start"}
                    name={"wednesday_start"}
                    required={false}
                    value={device.wednesday_start}
                />
                <InputTime
                    title={"Wednesday end"}
                    name={"wednesday_end"}
                    required={false}
                    value={device.wednesday_end}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Thursday start"}
                    name={"thursday_start"}
                    required={false}
                    value={device.thursday_start}
                />
                <InputTime
                    title={"Thursday end"}
                    name={"thursday_end"}
                    required={false}
                    value={device.thursday_end}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Friday start"}
                    name={"friday_start"}
                    required={false}
                    value={device.friday_start}
                />
                <InputTime
                    title={"Friday end"}
                    name={"friday_end"}
                    required={false}
                    value={device.friday_end}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Saturday start"}
                    name={"saturday_start"}
                    required={false}
                    value={device.saturday_start}
                />
                <InputTime
                    title={"Saturday end"}
                    name={"saturday_end"}
                    required={false}
                    value={device.saturday_end}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Sunday start"}
                    name={"sunday_start"}
                    required={false}
                    value={device.sunday_start}
                />
                <InputTime
                    title={"Sunday end"}
                    name={"sunday_end"}
                    required={false}
                    value={device.sunday_end}
                />
            </div>
        </div>
    </div>
        <div class="edit-device-modal-buttons">
             <div class="modal-buttons">
                <Button
                    type="button"
                    text="Cancel"
                    doFunc={doClose}
                    extra_class={"modal-button-close"}
                />
                <Button
                    disabled={sumbitButtonDisabled}
                    type="submit"
                    text="Submit"
                    extra_class={"modal-button-submit"}
                />
            </div>
        </div>
            

           
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
