import { fail, redirect } from '@sveltejs/kit';

import { env } from "$env/dynamic/private";

const API_URL = env.VITE_API_URL;

// Load function that clears the auth token cookie
export const load = async ({ cookies }) => {
	// Clear the auth token cookie
	cookies.delete('authToken', { path: '/' });
};

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
		const loginResponse = await fetch(API_URL + "/api/account/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(loginRequestBody),
		});

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
		
			// Set the jwt token as a cookie
			cookies.set("authToken", token, { 
				path: '/',
				httpOnly: true, // Prevent JavaScript access. Good practice to prevent XSS attacks
				secure: false, // Ensures the cookie is sent only over HTTPS
				sameSite: 'strict', // To prevent the cookie from being sent in cross-site requests
				maxAge: 60 * 60 * 24 * 7 // 7 days
			}); 
		
			redirect(303, url.searchParams.get('redirectTo') ?? '/dashboard');
		}		
	},
};
