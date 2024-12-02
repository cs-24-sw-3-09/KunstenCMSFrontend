import { redirect } from '@sveltejs/kit';

/* export const load = async ({ cookies }) => {
	// Clear the auth token cookie
	cookies.delete('authToken', { path: '/' });
	throw redirect(303, '/login');
}; */

/**@type {import("./$types").Actions} */
export const actions = {
    logout: async ({ cookies, url, request }) => {
        // Clear the auth token cookie
        cookies.delete('authToken', { path: '/' });
        throw redirect(303, '/login');
    },
}