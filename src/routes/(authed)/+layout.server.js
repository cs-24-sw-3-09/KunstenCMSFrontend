import {redirect} from "@sveltejs/kit"

export function load({ cookies, url }) {
	if (!cookies.get("authToken")) {
		redirect(303, `/login?redirectTo=${url.pathname}`);
	}
}
