import { fail } from "@sveltejs/kit";

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