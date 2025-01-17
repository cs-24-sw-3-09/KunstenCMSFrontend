<script>
    let { doClose, displayDevices, visualContent, updateTimeslots } = $props();

    visualContent = visualContent.filter(displayContentElement => 
        displayContentElement.type === "slideshow" || displayContentElement.fileType !== "video/mp4"
    );

    import { enhance } from "$app/forms";

    let days = $state({
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
    });
    let daysArray = Object.entries(days);
    let sumbitButtonDisabled = $state(false);


    // Function to log checked days
    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Smallheader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Checkbox from "$lib/components/modal/checkbox.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import Dateinput from "$lib/components/modal/InputDate.svelte";
    import { Tooltip } from "@svelte-plugins/tooltips";
    import InputTime from "$lib/components/modal/InputTime.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Create Timeslot" />
        <form
            action="?/newTimeslot"
            method="post"
            use:enhance={({}) => {
                sumbitButtonDisabled = true; 
                return async ({ result }) => {
                    // `result` is an `ActionResult` object
                    if (result.type === "failure") {
                            // Handle the error
                            alert(
                                `Failed to post timeslot.\n${result.data?.error}`,
                            );
                            sumbitButtonDisabled = false;
                        } else if (result.type === "success") {
                            doClose();
                            updateTimeslots(result.data.newData);
                        }
                };
            }}
        >
            <TextInput
                title={"Timeslot Name"}
                placeholder={"Type name here"}
                name={"name"}
                required="true"
            />

            <Separator />
            <div class="newTimeslot-modal-dates">

            <div class="newTimeslot-modal-dates-row">
                <Dateinput
                    title={"Date from"}
                    name={"dateFrom"}
                    required="true"
                />
                <Dateinput title={"Date to"} name={"dateTo"} required="true" />
            </div>

            <div class="newTimeslot-modal-dates-row">
                <InputTime
                    title={"Time from"}
                    name={"timeFrom"}
                    required="true"
                />
                <InputTime title={"Time to"} name={"timeTo"} required="true" />
            </div>
        </div>
            <div class="checkbox-container">
                {#each daysArray as [day, checked]}
                    <div class="checkbox-item">
                        <!-- Replace Smallheader and Checkbox with your components -->
                         <label class="checkbox-day-label" for="{day + "_id"}">{day[0]+day[1]}</label>
                        <Checkbox name={day} {checked} />
                    </div>
                {/each}
            </div>

            <Separator />

            <div class="modal-dropdown">
                <label for={"content_id"}>{"Content to be displayed"}</label>
                <select id={"content_id"} name={"displayContent"} required>
                    {#each visualContent as content}
                        <option
                            value={`{"id": ${content.id}, "type": "${content.type}"}`}
                            >{content.type === "visualMedia"
                                ? "Media"
                                : "Slideshow"
                            }: {content.name}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="newTimeslot-modal-display-devices-title">Display Devices</div>
            <div class="newTimeslot-modal-display-devices">
                {#each displayDevices as display}
                <div class="newTimeslot-modal-display-device">
                    <label for="{display.id}"> <input type="checkbox" name="{display.id}" id="{display.id}">{display.name}</label>
                </div>
                {/each}

            </div>
<!--
            <div class="checkbox-container">
                {#each displayDevices as display}
                    <div class="checkbox-item">
                        <Smallheader text={display.name} />
                        <Checkbox name={display.id} />
                    </div>
                {/each}
            </div>
-->
            <Separator />

            <div class="newTimeslot-force">
                <div class="newTimeslot-force-title">
                    <Tooltip content="If dimensions don't fit, you can force" position="top">
                        <div class="newTimeslot-force-title-icon">?</div>
                    </Tooltip>
                    <label for="force" class="newTimeslot-force-title-text">Force</label>
                </div>
                <input type="checkbox" id="force" name="force">
            </div>
            

            <div class="modal-buttons">
                <Button
                    type="button"
                    text="Cancel"
                    doFunc={doClose}
                    extra_class={"modal-button-close"}
                />
                <Button
                    disabled = {sumbitButtonDisabled}
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
</style>
