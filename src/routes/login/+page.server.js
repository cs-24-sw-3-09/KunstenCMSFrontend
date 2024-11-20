import { redirect } from '@sveltejs/kit';
/* import jwt from "jsonwebtoken"; */


// https://authjs.dev/reference/sveltekit



/* export const load = async ({ cookies }) => {
	const authToken = cookies.get('authToken');
	if (authToken) {
		const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
		return {
			user: decoded
		};
	}
	return {
		user: undefined
	};
}; */

export const actions = {
	/* login: async ({ cookies, request }) => {
		const loginFormData = await request.formData();
		const { email } = loginFormData.get("email").toString();
		const { password } = loginFormData.get("password").toString();

		const loginResponse = {
			email,
			password,
			error: false,
			message: ""
		}

		try {
			const userAttemptingLogin = await fetch(APIURL + "/api/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			
		}
		
	}, */

	// Set authToken and redirect to dashboard
	default: ({ cookies, url }) => {
		cookies.set('authToken', 'true', { path: '/' });
		redirect(303, url.searchParams.get('redirectTo') ?? '/dashboard');
	}
};
