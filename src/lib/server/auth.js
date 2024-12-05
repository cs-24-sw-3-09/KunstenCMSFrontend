
import { env } from "$env/dynamic/private";

/** @type {import('@sveltejs/kit').RequestEvent} */
export async function authenticateUser({ request, cookies }) {

	const token = cookies.get('authToken');
	
    if (token) {
        const user = await fetch(env.SERVER_API_URL + "/api/account", {
            method: "GET",
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        const userData = await user.json();

		return userData;
    }

    return null;
}