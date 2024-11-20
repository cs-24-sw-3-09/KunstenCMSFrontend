import { fail, redirect } from '@sveltejs/kit';

const API_URL = import.meta.env.VITE_API_URL


// Actions:
// - Login

/** @type {import("./$types").Actions} */
export const actions = {
	login : async ({ cookies, url, request }) => {
		const formData = await request.formData();

		const email = formData.get("email").toString();
		const password = formData.get("password").toString();

		const loginRequestBody = {
			email,
			password,
		};
		
		// Validate the email and password fields
        if (!loginRequestBody.email || !loginRequestBody.password) {
            return fail(400, { error: "Email and password are required." });
        }

		// Login request
		const loginResponse = await fetch(API_URL + "/api/auth/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(loginRequestBody),
		});

		console.log("loginResponsestart", loginResponse,"loginResponseend");		

		if (loginResponse.status !== 200) {
			try {
				cookies.delete('authToken', { path: '/' });
			} catch (e) {
				console.error(e);
			}

			return fail(loginResponse.status, {
				error: true,
				message: "Incorrect email or password."
			});
		}

		if (loginResponse.status === 200) {
			const token = await loginResponse.text(); // Extract the jwt token as plain text
		
			cookies.set("authToken", token, { path: '/' }); // Set the jwt token as a cookie
		
			console.log("Token:", token); // Optional: Log for debugging
			redirect(303, url.searchParams.get('redirectTo') ?? '/dashboard');
		}		
	},
};
