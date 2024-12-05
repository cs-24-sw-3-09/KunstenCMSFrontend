import { fail } from "@sveltejs/kit";

const API_URL = import.meta.env.SERVER_API_URL;

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
    console.log(visualMediasData.concat(slideshowsData));
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
    newTimeslot: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        console.log(formData);

        return fail(400, { error: "Not implemented" });

        return { success: true };
    },

    deleteTimeslot: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        console.log(formData);

        return fail(400, { error: "Not implemented" });

        return { success: true };
    },

    editTimeslot: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        console.log(formData);

        return fail(400, { error: "Not implemented" });

        return { success: true };
    },
}