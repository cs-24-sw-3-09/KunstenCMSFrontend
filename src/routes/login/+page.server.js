import { redirect } from '@sveltejs/kit';
import jwt from "jsonwebtoken";

export const actions = {
	default: ({ cookies, url }) => {
		cookies.set('logged_in', 'true', { path: '/' });
		redirect(303, url.searchParams.get('redirectTo') ?? '/dashboard');
	}
};
