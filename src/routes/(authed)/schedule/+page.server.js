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

    return {
        timeslotsData,
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