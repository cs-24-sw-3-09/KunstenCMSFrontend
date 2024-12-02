import { error } from '@sveltejs/kit';

import { SOCKET_URL } from "$env/static/private";
import { VITE_API_URL } from "$env/static/private";

export const load = async ({ params }) => {
    if(isNaN(params.id) || params.id.indexOf(".") !== -1) {
        error(404, 'Screen id error');
    }
	return {
	    deviceId: params.id,
        socketUrl: SOCKET_URL,
        apiUrl: VITE_API_URL
	};
};