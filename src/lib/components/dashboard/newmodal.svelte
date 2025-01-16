<script>
    let { doClose, createDevice } = $props();

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
    });
</script>

<div class="new-device-modal">
    <div class="new-device-modal-content">
        <CloseX doFunc={doClose} />
        <Header text="New Device" />

        <form
            method="post"
            action="?/newDevice"
            use:enhance={({ formData }) => {
                sumbitButtonDisabled = true;
                return async ({ result }) => {
                    switch (result.type) {
                        case "failure":
                            alert(
                                `Failed to add display device, please reload page (F5).\n${result.data?.error}`,
                            );
                            break;
                        case "success":
                            createDevice(result.data.responseData);
                            closeModal(); // Call doClose on successful form submission
                            break;
                    }
                };
            }}
        >
        <div class="new-device-modal-top">
            <div class="new-device-modal-left">
                <TextInput
                title={"Name"}
                placeholder={"Name of device here"}
                name={"name"}
                required="true"
            />
            <TextInput
                title={"Location"}
                placeholder={"Location of device here"}
                name={"location"}
                required="true"
            />

            <!-- <Dropdown title={"Fallback"} name={"fallback"} {options} /> -->

            <div class="modal-dropdown">
                <label for={"fallback_id"}>{"Fallback"}</label>
                <select id={"fallback_id"} name={"fallbackContent"} required>
                    {#each options as option}
                        <option
                            value={`{"id": ${option.id}, "type": "${option.type}"}`}
                            >{option.type === "visualMedia"
                                ? "Media"
                                : "Slideshow"}: {option.name}</option
                        >
                    {/each}
                </select>
            </div>

            <!-- <TextInput title={"Model"} placeholder={"Model of device here"} name={"model"} required="true" /> -->


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
                />
            </div>

            <Dropdown
                title={"Display Orientation"}
                name={"displayOrientation"}
                options={["horizontal", "vertical"]}
                required="true"
            />

            </div>
            <div class="new-device-modal-right"><div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Monday start"}
                    name={"monday_start"}
                    required={false}
                />
                <InputTime
                    title={"Monday end"}
                    name={"monday_end"}
                    required={false}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Tuesday start"}
                    name={"tuesday_start"}
                    required={false}
                />
                <InputTime
                    title={"Tuesday end"}
                    name={"tuesday_end"}
                    required={false}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Wednesday start"}
                    name={"wednesday_start"}
                    required={false}
                />
                <InputTime
                    title={"Wednesday end"}
                    name={"wednesday_end"}
                    required={false}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Thursday start"}
                    name={"thursday_start"}
                    required={false}
                />
                <InputTime
                    title={"Thursday end"}
                    name={"thursday_end"}
                    required={false}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Friday start"}
                    name={"friday_start"}
                    required={false}
                />
                <InputTime
                    title={"Friday end"}
                    name={"friday_end"}
                    required={false}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Saturday start"}
                    name={"saturday_start"}
                    required={false}
                />
                <InputTime
                    title={"Saturday end"}
                    name={"saturday_end"}
                    required={false}
                />
            </div>
            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Sunday start"}
                    name={"sunday_start"}
                    required={false}
                />
                <InputTime
                    title={"Sunday end"}
                    name={"sunday_end"}
                    required={false}
                />
            </div>
        </div>
            <div class="new-device-modal-buttons">
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
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
    @import "$lib/styles/newDeviceModal.css";
</style>
