
// load user from locals for modifieing the layout
/** @type {import("./$types").PageServerLoad} */
export async function load({ locals }) {
    return { 
        user: locals.user, 
    };
}

