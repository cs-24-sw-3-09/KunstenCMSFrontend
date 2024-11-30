import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies }) => {
		cookies.delete('authToken', { path: '/' });
		redirect(303, '/login');
	}
};
