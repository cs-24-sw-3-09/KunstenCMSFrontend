import { fail, redirect } from "@sveltejs/kit";

const API_URL = import.meta.env.SERVER_API_URL;

// Actions: 
// - Reset password:
// 

/** @type {import("./$types").Actions} */
export const actions = {
	requestPassword: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get("email");

		// Validate the email field
		if (!email) {
			return fail(400, { error: "Email is required." });
		}

		const response = await fetch(API_URL + "/api/account/reset-password", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ "email": email }),
		});

		if (response.status !== 200) {
			console.log("Failed to send reset password email.", response.status);
			return fail(response.status, {
				error: true,
				message: "Could not send reset password email."
			});
		} 

		console.log(`Sending reset password email to: ${email}`);

		// Respond with success
		return { success: true };
	},
};
