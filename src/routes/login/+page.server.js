import { error, fail, redirect } from '@sveltejs/kit';
import axios from 'axios';

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
	login: async ({ cookies, url, request }) => {
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
		try {
			let token = await axios.post(API_URL + "/api/account/login", loginRequestBody, {
				headers: {
					"Content-type": "application/json",
				},
			}).then(response => {
				return response.data; // Extract the jwt token as plain text
			});

			// Set the jwt token as a cookie
			cookies.set("authToken", token, {
				path: '/',
				httpOnly: true, // Prevent JavaScript access. Good practice to prevent XSS attacks
				secure: true, // Ensures the cookie is sent only over HTTPS
				sameSite: 'strict', // To prevent the cookie from being sent in cross-site requests
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});
		} catch (error) {
			try {
				cookies.delete('authToken', { path: '/' });
			} catch (e) {
				console.error(e);
			}
			return fail(error.status || 500, {
				error: true,
				message: "Incorrect email or password."
			});
		}

		redirect(303, url.searchParams.get('redirectTo') ?? '/dashboard');
	},
};
