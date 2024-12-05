<script>
    import { env } from "$env/dynamic/private";
    let { doClose, timeslot, displayDevices, visualContent } = $props();

    import { enhance } from "$app/forms";

    let days = {
        Mon: true,
        Tue: true,
        Wed: false,
        Thu: true,
        Fri: true,
        Sat: true,
        Sun: true,
    };
    console.log(days);
    let daysArray = Object.entries(days);
    //console.table(timeslot);

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
                <select id={"content_id"} name={"fallbackContent"} required>
                    {#each visualContent as content}
                        <option
                            value={`{"id": ${content.id}, "type": "${content.type}"}`}
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
                        <Checkbox name={display.name} />
                    </div>
                {/each}
            </div>

            <Separator />
        </form>

        <div class="modal-buttons">
            <form
                method="post"
                action="?/deleteTimeslot"
                use:enhance={async ({ FormData, cancel }) => {
                    let informationData = await fetch(
                        env.CLIENT_API_URL + "/api/timeslot",
                        {
                            method: "GET",
                            headers: {
                                Authorization: "Bearer " + authToken,
                                "Content-type": "application/json",
                            },
                        },
                    );

                    console.log(await informationData.json());

                    let confirmation = confirm(
                        `Are you sure you want to delete "${props.timeslot.name}"? ${getSSPartOfTSData}`,
                    );
                    if (!confirmation) return cancel();

                    formData.set("timeslotID", props.timeslot.id);

                    return async ({ result }) => {
                        // `result` is an `ActionResult` object
                        if (result.type === "failure") {
                            // Handle the error
                            alert(
                                `Failed to delete timeslot, please reload page (F5).\n${result.data?.error}`,
                            );
                        } else if (result.type === "success") {
                            props.updateSlideshowContent(result.data.newData);
                        }
                    };
                }}
            >
                <Button
                    type="submit"
                    text="Delete"
                    extra_class={"modal-button-delete"}
                />
            </form>

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
    </div>
</div>

<style>
    @import "$lib/styles/modal.css";
</style>
