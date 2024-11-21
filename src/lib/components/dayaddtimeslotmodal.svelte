<script>
    let { doClose, doSubmit } = $props();
    let days = {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
    };

    let display_devices = {
        Display1: "Reception Left",
        Display2: "Reception Right",
        Display3: "Reception Middle"
    }

    let slideshows = ["slideshow_id1", "slideshow_id2", "slideshow_id3", "slideshow_id4" ];

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
    import InputTime from "./modal/InputTime.svelte";
</script>

<div class="modal">
    <div class="modal-content">
        <CloseX doFunc={doClose} />
        <Header text="Create Timeslot" />
        <form action="#" id="modal-form" onsubmit={doSubmit}>
            <div>
                <p>From</p>
                <Dateinput name={"DateFrom"} required="true" />
                <InputTime name={"TimeFrom"} required="true" />
            </div>
            <div>
                <p>To</p>
                <Dateinput name={"DateTo"} required="true" />
                <InputTime name={"TimeTo"} required="true" />
            </div>            

            <div class="checkbox-container">
                {#each Object.keys(days) as day}
                    <div class="checkbox-item">
                        <Smallheader text= {day}/>
                        <Checkbox name= {day}/>
                    </div>
                {/each}
            </div>

            <Separator />

            <TextInput title={"Timeslot Name"} placeholder={"Type name here"} name={"name"} required="true" />

            <Dropdown title={"Slideshow"} name={"dropdown1"} options={slideshows} selected={"Option 1"} />
            <div class="checkbox-container">
                {#each Object.keys(display_devices) as display}
                    <div class="checkbox-item">
                        <Smallheader text= {display}/>
                        <Checkbox name= {display}/>
                    </div>
                {/each}
            </div>

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
