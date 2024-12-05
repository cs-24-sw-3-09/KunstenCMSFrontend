import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    if(isNaN(params.id) || params.id.indexOf(".") !== -1) {
        error(404, 'Screen id error');
    }
	return {
	    deviceId: params.id
	};
};