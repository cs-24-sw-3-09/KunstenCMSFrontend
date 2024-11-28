
import { fail } from "@sveltejs/kit";

// Actions:
// - Edit User Profile
// - Change Password
// - notificationState
// - pauseNotifications


// Input validation
// Uses inbuild form 

/** @type {import("./$types").Actions} */
export const actions = {
    newMediaToSLideshow: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        console.log(formData);

        //return fail(400, { error: "Not implemented yet." });

        return { success: true};
    },
}