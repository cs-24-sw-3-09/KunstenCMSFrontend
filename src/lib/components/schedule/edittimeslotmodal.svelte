<script>
    let { doClose, timeslot } = $props();

    import { enhance } from "$app/forms";

    let days = {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
    };

    // Test data TODO: make dynamic from database
    let display_devices = {
        Display1: "Reception Left",
        Display2: "Reception Right",
        Display3: "Reception Middle",
    };
    console.table(timeslot);

    // Test data TODO: make dynamic from database
    let slideshows = [
        "slideshow_id1",
        "slideshow_id2",
        "slideshow_id3",
        "slideshow_id4",
    ];

    // Function to log checked days
    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Smallheader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Dropdown from "$lib/components/modal/dropdown.svelte";
    import Checkbox from "$lib/components/modal/checkbox.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import Dateinput from "$lib/components/modal/InputDate.svelte";
    import InputTime from "$lib/components/modal/InputTime.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit timeslot" />
        <form
            action="?/Edit timeslot"
            method="post"
            use:enhance={({}) => {
                return async ({ result }) => {
                    // `result` is an `ActionResult` object
                    if (result.type === "failure") {
                        // Handle the error
                        alert(
                            `Failed to add timeslot, please reload page (F5).\n${result.data?.error}`,
                        );
                    }
                };
            }}
        >
            <TextInput
                title={"Timeslot Name"}
                value={timeslot.name}
                placeholder={"Type name here"}
                name={"name"}
                required="true"
            />

            <Separator />

            <Smallheader text={"Date from and to"} />
            <div class="modal-inline">
                <Dateinput
                    title={"Date from"}
                    name={"dateFrom"}
                    required="true"
                    value={timeslot.startDate}
                />
                <Dateinput
                    title={"Date to"}
                    name={"dateTo"}
                    required="true"
                    value={timeslot.endDate}
                />
            </div>

            <Smallheader text={"Time of day from and to"} />

            <div class="modal-inline">
                <InputTime
                    title={"Time from"}
                    name={"timeFrom"}
                    required="true"
                    value={timeslot.startTime}
                />
                <InputTime
                    title={"Time to"}
                    name={"timeTo"}
                    required="true"
                    value={timeslot.endTime}
                />
            </div>

            <div class="checkbox-container">
                {#each Object.keys(days) as day}
                    <div class="checkbox-item">
                        <Smallheader text={day} />
                        <Checkbox name={day} />
                    </div>
                {/each}
            </div>

            <Separator />

            <Dropdown
                title={"Slideshow"}
                name={"dropdown1"}
                options={slideshows}
                selected={"Option 1"}
            />
            <div class="checkbox-container">
                {#each Object.keys(display_devices) as display}
                    <div class="checkbox-item">
                        <Smallheader text={display} />
                        <Checkbox name={display} />
                    </div>
                {/each}
            </div>

            <Separator />

            <div class="modal-buttons">
                <Button
                    type="button"
                    text="Cancel"
                    doFunc={doClose}
                    extra_class={"modal-button-close"}
                />
                <Button
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
