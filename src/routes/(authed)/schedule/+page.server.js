import { fail } from "@sveltejs/kit";

const API_URL = import.meta.env.VITE_API_URL;

// Loads:
// - Timeslots

// load user from locals for modifieing the page
/** @type {import("./$types").PageServerLoad} */
export async function load({ locals }) {

    const response = await fetch(API_URL + "/api/time_slots", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + locals.user.token
        }
    });

    console.log(response.status);

    /* const responseData = await response.json();

    console.log(responseData); */

    return {
        user: locals.user,
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