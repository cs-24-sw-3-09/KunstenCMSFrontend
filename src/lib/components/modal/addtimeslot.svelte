<script>
    let { doClose, doSubmit } = $props();
    let days = {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false
    };

    // Function to log checked days
    


    


    import CloseX from "$lib/components/modal/closex.svelte";
    import Header from "$lib/components/modal/header.svelte";
    import Smallheader from "$lib/components/modal/smallheader.svelte";
    import TextInput from "$lib/components/modal/textinput.svelte";
    import Numberinput from "$lib/components/modal/numberinput.svelte";
    import Dropdown from "$lib/components/modal/dropdown.svelte";
    import Checkbox from "$lib/components/modal/checkbox.svelte";
    import Button from "$lib/components/modal/button.svelte";
    import Separator from "$lib/components/modal/separator.svelte";
    import Dateinput from "$lib/components/modal/InputDate.svelte";

    let addtimeslotform = $state({
        selectedDateFrom: "",
        selectedTimeFrom: "",
        selectedDateTo: "",
        selectedTimeTo: "",
        TimeSlotName: ""
    });


    function logSelections() {
        console.log("From Date:", addtimeslotform.selectedDateFrom);
        console.log("From Time:", addtimeslotform.selectedTimeFrom);
        console.log("To Date:", addtimeslotform.selectedDateTo);
        console.log("To Time:", addtimeslotform.selectedTimeTo);
        console.log("Name:", addtimeslotform.TimeSlotName);
    }

</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Create Timeslot" />
        <form action="#" id="modal-form" onsubmit={doSubmit}>

            <Dateinput {addtimeslotform} />

            <div class="checkbox-container">
                {#each Object.keys(days) as day}
                    <div class="checkbox-item">
                        <p>{day}</p>
                        <input
                            type="checkbox" name={day}
                            bind:checked={days[day]} />
                    </div>
                {/each}
            </div>

            <Separator/>

            <Dropdown title={"Slideshow"} name={"dropdown1"} options={["Option 1", "Option 2", "Option 3"]} selected={"Option 1"} />
            <TextInput title={"Timeslot Name"} placeholder={"Type name here"} name={"name"} required="true" />
            
            <Separator/>

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
