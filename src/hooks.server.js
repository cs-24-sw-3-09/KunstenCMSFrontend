import { authenticateUser } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';
//import jwt from 'jsonwebtoken'; // Replace with your JWT library

// locals = 
// coustume object build when a request comes though the handle hook
// passed along with the request event, to the rest of the serverside sveltekit load/actions/... functions

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // Get test user and set to locals
    event.locals.user = await authenticateUser(event);

    const protectedUserRoutes = ["/dashboard", "/profile"];
    if (protectedUserRoutes.some(route => event.url.pathname.startsWith(route))) {
        if (!event.locals.user) {
            // Clear the auth token cookie
            event.cookies.delete("authToken", { path: "/" });
            // Redirect to login page
            throw redirect(303, "/login");
        }
    }

    const protectedPlannerRouteRoutes = ["/gallery", "/slideshow", "/schedule", "/slideshow?/postNewOrder"];
    if (protectedPlannerRouteRoutes.some(route => event.url.pathname.startsWith(route))) {
        if (!event.locals.user || !event.locals.user.mediaPlanner) {
            throw redirect(303, "/dashboard");
        }
    }

    const protectedAdminRoutes = ["/admin"];
    if (protectedAdminRoutes.some(route => event.url.pathname.startsWith(route))) {
        if (!event.locals.user || !event.locals.user.admin) {
            throw redirect(303, "/dashboard");
        }
    }

    // Resolve the request
    const response = await resolve(event);

    // Return the response
    return response;
};