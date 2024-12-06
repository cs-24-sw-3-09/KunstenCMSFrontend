import { fail, redirect } from "@sveltejs/kit";

import { env } from "$env/dynamic/private";

/** @type {import(".types").PageServerLoad} */
export const load = async ({ cookies }) => {
	// Clear the auth token cookie
	cookies.delete('authToken', { path: '/' });
};

// Actions: 
// - Reset password:
// 

/** @type {import("./$types").Actions} */
export const actions = {
	resetPassword : async ({ request }) => {
		const formData = await request.formData();

        let data = {
            email: formData.get("email"),
            token: formData.get("token"),
            password: formData.get("password") === formData.get("confpassword") ? formData.get("password") : null,
        }

		// Validate the password field
        if (data.password === null) {
            return fail(400, { error: "Password not confirmed." });
        }

		const response = await fetch(env.SERVER_API_URL+"/api/account/reset-password/new", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.status !== 200) {
            return fail(response.status, {
                error: true,
                message: "Could not change password."
            });
        }

		// Respond with success
        return { success: true };
	},
};
