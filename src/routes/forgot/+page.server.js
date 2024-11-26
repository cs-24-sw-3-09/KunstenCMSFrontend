import { fail, redirect } from "@sveltejs/kit";

// Actions: 
// - Reset password:
// 

/** @type {import("./$types").Actions} */
export const actions = {
	resetPassword : async ({ request }) => {
		const formData = await request.formData();
		console.log(formData);

		const email = formData.get("email");
		console.log(email);

		// Validate the email field
        if (!email) {
            return fail(400, { error: "Email is required." });
        }



		// Mock sending a reset password email
        console.log(`Sending reset password email to: ${email}`);

		// Respond with success
        return { success: true };
	},
};
