import { redirect } from '@sveltejs/kit';

// Redirect from root to login og dashboard depending on auth status
export function load({ cookies }) {
    const logged_in = cookies.get("authToken");
    if (logged_in) {
        redirect(303, '/dashboard');
    } else {
        redirect(303, '/login');
    }
};