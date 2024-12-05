import { fail } from "@sveltejs/kit";

const API_URL = import.meta.env.VITE_API_URL;

// Loads:
// - Timeslots

// load user from locals for modifieing the page
/** @type {import("./$types").PageServerLoad} */
export async function load({ locals, cookies }) {

    const timeslots = await fetch(API_URL + "/api/time_slots", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    const timeslotsData = await timeslots.json();

    const displayDevices = await fetch(API_URL + "/api/display_devices", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    const visualMedia = await fetch(API_URL + "/api/visual_medias", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    let visualMediasData = await visualMedia.json();

    visualMediasData = visualMediasData.content.map(visualMedia => {
        return { ...visualMedia, type: "visualMedia" }
    });


    const slideshows = await fetch(API_URL + "/api/slideshows", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    let slideshowsData = await slideshows.json();

    slideshowsData = slideshowsData.map(slideshow => {
        return { ...slideshow, type: "slideshow" }
    });
    const displayDevicesData = (await displayDevices.json()).content;
    return {
        timeslotsData,
        displayDevicesData,
        content: visualMediasData.concat(slideshowsData)
    };
}

// Actions:
// - Add Timeslot
// - Delete Timeslot
// - Edit Timeslot


// Input validation
// Uses inbuild form 

/** @type {import("./$types").Actions} */
export const actions = {

    deleteTimeslot: async ({ cookies, url, request }) => {
        /*const formData = await request.formData();
        console.log("in here")
        console.log(formData);

        return fail(400, { error: "Not implemented" });

        return { success: true };*/
        ///---------------------------
        const formData = await request.formData();
        const timeslot = await fetch(API_URL + "/api/time_slots/" + formData.get("timeslotID"), {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        })

        if (timeslot.status == 404) {
            return fail(timeslot.status, { error: "Could not find the time slot." });
        } else if (timeslot.status !== 204) {
            return fail(timeslot.status, { error: "Failed to delete time slot." });
        }

        let newTimeslotData = await getTimeslot({ cookies, url, request });
        return {
            success: true,
            newData: newTimeslotData,
        };
    },
    patchTimeslot: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        // requestBody sendt for the patch action
        let startDate = new Date(formData.get("dateFrom"));
        let endDate = new Date(formData.get("dateTo"));
        let startTime = formData.get("timeFrom"); // Assuming these are in "HH:MM" format
        let endTime = formData.get("timeTo");

        // Validate date and time
        if (startDate > endDate) {
            return fail(400, { error: "End date is before start date." });
        }

        // If dates are the same, compare times
        if (startTime > endTime) {
            return fail(400, { error: "End time is before start time." });
        }

        let weekdaysChosen = 0;
        if (formData.get("Mon") == "on") {
            weekdaysChosen += 1;
        }
        if (formData.get("Tue") == "on") {
            weekdaysChosen += 2;
        }
        if (formData.get("Wed") == "on") {
            weekdaysChosen += 4;
        }
        if (formData.get("Thu") == "on") {
            weekdaysChosen += 8;
        }
        if (formData.get("Fri") == "on") {
            weekdaysChosen += 16;
        }
        if (formData.get("Sat") == "on") {
            weekdaysChosen += 32;
        }
        if (formData.get("Sun") == "on") {
            weekdaysChosen += 64;
        }
        if (weekdaysChosen == 0) {
            return fail(400, { error: "Please pick one or multiple weekdays" });
        }

        let displayDevicesObj = [];
        for (let key of formData.keys()) {
            if (!isNaN(key)) {
                displayDevicesObj.push({ id: Number(key) });
            }
        }

        let requestBody = JSON.stringify({
            name: formData.get("name"),
            startDate: formData.get("dateFrom"),
            endDate: formData.get("dateTo"),
            startTime: (/^\d{2}:\d{2}$/.test(formData.get("timeFrom")))?formData.get("timeFrom") + ":00": formData.get("timeFrom"), // Needs to be in format dd:dd:dd, so makeing sure
            endTime: (/^\d{2}:\d{2}$/.test(formData.get("timeTo")))?formData.get("timeTo") + ":00": formData.get("timeTo"),
            weekdaysChosen: weekdaysChosen,
            //displayDevices: displayDevicesObj,
            //displayContent: JSON.parse(formData.get("displayContent")),
        });
        console.log("VM", JSON.parse(formData.get("displayContent")));
        console.log("DD", displayDevicesObj);
        // Send the request to the backend        
        const response = await fetch(API_URL + "/api/time_slots/" + formData.get("timeslotID"), {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: requestBody,
        });

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to create time slot" });
        }

        let newTimeSlotData = await getTimeslot({ cookies, url, request });
        return {
            success: true,
            newData: newTimeSlotData,
        };

    },
    newTimeslot: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        //console.log("formdata123", formData)
        //console.log(formData)

        // requestBody sendt for the patch action
        let startDate = new Date(formData.get("dateFrom"));
        let endDate = new Date(formData.get("dateTo"));
        let startTime = formData.get("timeFrom"); // Assuming these are in "HH:MM" format
        let endTime = formData.get("timeTo");

        // Construct the request body

        // Validate date and time
        if (startDate > endDate) {
            return fail(400, { error: "End date is before start date." });
        }

        // If dates are the same, compare times
        if (startTime > endTime) {
            return fail(400, { error: "End time is before start time." });
        }


        let weekdaysChosen = 0;
        if (formData.get("Mon") == "on") {
            weekdaysChosen += 1;
        }
        if (formData.get("Tue") == "on") {
            weekdaysChosen += 2;
        }
        if (formData.get("Wed") == "on") {
            weekdaysChosen += 4;
        }
        if (formData.get("Thu") == "on") {
            weekdaysChosen += 8;
        }
        if (formData.get("Fri") == "on") {
            weekdaysChosen += 16;
        }
        if (formData.get("Sat") == "on") {
            weekdaysChosen += 32;
        }
        if (formData.get("Sun") == "on") {
            weekdaysChosen += 64;
        }
        if (weekdaysChosen == 0) {
            return fail(400, { error: "Please pick one or multiple weekdays" });
        }

        let displayDevicesObj = [];
        for (let key of formData.keys()) {
            if (!isNaN(key)) {
                displayDevicesObj.push({ id: Number(key) });
            }
        }

        let requestBody = JSON.stringify({
            name: formData.get("name"),
            startDate: formData.get("dateFrom"),
            endDate: formData.get("dateTo"),
            startTime: formData.get("timeFrom") + ":00",
            endTime: formData.get("timeTo")+ ":00",
            weekdaysChosen: weekdaysChosen,
            displayDevices: displayDevicesObj,
            displayContent: JSON.parse(formData.get("displayContent")),
        });

        // Send the request to the backend        
        const response = await fetch(API_URL + "/api/time_slots", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: requestBody,
        });
        console.log(response)

        if (response.status !== 201) {
            return fail(response.status, { error: "Failed to create time slot" });
        }

        let newTimeSlotData = await getTimeslot({ cookies, url, request });
        return {
            success: true,
            newData: newTimeSlotData,
        };
    },
}


async function getTimeslot({ cookies, url, request }) {
    const slideshow = await fetch(API_URL + "/api/time_slots", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    })

    let slideshowData = await slideshow.json();
    return slideshowData;
}