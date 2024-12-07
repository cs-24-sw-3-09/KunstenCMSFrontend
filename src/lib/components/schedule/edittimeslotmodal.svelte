<script>
    import { env } from "$env/dynamic/public";
    let { doClose, timeslot, displayDevices, visualContent, updateTimeslots } =
        $props();

    import { enhance } from "$app/forms";
    import { getCookie } from "$lib/utils/getcookie.js";

    console.log(timeslot);

    let days = {
        Mon: true,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
    };

    updateDaysFromBits();
    function updateDaysFromBits() {
        // Define the day order
        const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        // Loop through the day order and set true/false based on the bits
        dayOrder.forEach((day, index) => {
            // Extract the bit at the corresponding position (from right to left)
            days[day] = Boolean((timeslot.weekdaysChosen >> index) & 1);
        });
    }
    let daysArray = Object.entries(days);

    // Function to log checked days
    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Smallheader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Checkbox from "$lib/components/modal/checkbox.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import Dateinput from "$lib/components/modal/InputDate.svelte";
    import InputTime from "$lib/components/modal/InputTime.svelte";

    console.log("TEST", !!timeslot.displayDevices.find((dd) => dd.id == 2));

    let selectedContent = JSON.stringify({
        id: timeslot.displayContent.id,
        type: timeslot.displayContent.type,
    });
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Edit timeslot" />
        <form
            id="edit"
            action="?/patchTimeslot"
            method="post"
            use:enhance={({ formData }) => {
                formData.set("timeslotID", timeslot.id);
                return async ({ result }) => {
                    // `result` is an `ActionResult` object
                    if (result.type === "failure") {
                        // Handle the error
                        alert(
                            `Failed to mofify timeslot.\n${result.data?.error}`,
                        );
                    } else if (result.type === "success") {
                        doClose();
                        updateTimeslots(result.data.newData);
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
                {#each daysArray as [day, checked]}
                    <div class="checkbox-item">
                        <!-- Replace Smallheader and Checkbox with your components -->
                        <Smallheader text={day} />
                        <Checkbox name={day} {checked} />
                    </div>
                {/each}
            </div>

            <Separator />

            <div class="modal-dropdown">
                <label for={"content_id"}>{"Content to be displayed"}</label>
                <select
                    id={"content_id"}
                    name={"displayContent"}
                    bind:value={selectedContent}
                    required
                >
                    {#each visualContent as content}
                        <option
                            value={JSON.stringify({
                                id: content.id,
                                type: content.type,
                            })}
                            >{content.type === "visualMedia"
                                ? "Media"
                                : "Slideshow"}: {content.name}</option
                        >
                    {/each}
                </select>
            </div>
            <br />
            <div class="checkbox-container">
                {#each displayDevices as display}
                    <div class="checkbox-item">
                        <Smallheader text={display.name} />
                        <Checkbox
                            name={display.id}
                            checked={!!timeslot.displayDevices.find(
                                (dd) => dd.id == display.id,
                            )}
                        />
                    </div>
                {/each}
            </div>

            <Separator />
            <Smallheader text={"Force changes:"} />
            <Checkbox
                name={"Force"}
                checked={false}
            />
        </form>

        <div class="modal-buttons">
            <form
                id="delete"
                method="POST"
                action="?/deleteTimeslot"
                use:enhance={async ({ formData, cancel }) => {
                    let confirmation = confirm(
                        `Are you sure you want to delete "${timeslot.name}"?`,
                    );
                    if (!confirmation) return cancel();

                    formData.set("timeslotID", timeslot.id);

                    return async ({ result }) => {
                        // `result` is an `ActionResult` object
                        if (result.type === "failure") {
                            // Handle the error
                            alert(
                                `Failed to delete timeslot, please reload page(f5).\n${result.data?.error}`,
                            );
                        } else if (result.type === "success") {
                            doClose();
                            updateTimeslots(result.data.newData);
                        }
                    };
                }}
            ></form>

            <button
                type="submit"
                form="edit"
                class="modal-button modal-button-submit"
            >
                Submit
            </button>
            <button
                type="submit"
                form="delete"
                class="modal-button modal-button-delete"
            >
                Delete
            </button>

            <Button
                type="button"
                text="Cancel"
                doFunc={doClose}
                extra_class={"modal-button-close"}
            />
        </div>
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
