import { fail, redirect } from '@sveltejs/kit';

// Actions:
// - Login

/** @type {import("./$types").Actions} */
export const actions = {
	login : async ({ cookies, url, request }) => {
		const formData = await request.formData();
		const email = formData.get("email");
		const password = formData.get("password");
		
		// Debug
		console.log(formData);

		// Validate the email and password fields
        if (!email || !password) {
            return fail(400, { error: "Email and password are required." });
        }

		// Mock validate the email and password
        if (email !== "admin@example.com" || password !== "password") {
            return fail(400, { error: "Invalid email or password." });
        }

		// Mock logging in
		console.log(`Logging in: ${email}`);

		// Mock setting authToken cookie
		cookies.set("authToken", "true", { path: "/" });
		
		// Redirect to dashboard if successful
		redirect(303, url.searchParams.get("redirectTo") ?? "/dashboard");
		
		// Respond with success
        //return { success: true };
	},
};
