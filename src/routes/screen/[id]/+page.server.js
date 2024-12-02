import { error } from '@sveltejs/kit';

import { env } from "$env/dynamic/private";

export const load = async ({ params }) => {
    if(isNaN(params.id) || params.id.indexOf(".") !== -1) {
        error(404, 'Screen id error');
    }
	return {
	    deviceId: params.id,
        socketUrl: env.SOCKET_URL,
        apiUrl: env.VITE_API_URL
	};
};