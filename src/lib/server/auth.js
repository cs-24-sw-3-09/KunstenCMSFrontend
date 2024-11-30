
/** @type {import('@sveltejs/kit').RequestEvent} */
export async function authenticateUser({ request, cookies }) {

	const token = cookies.get('authToken');
	
    if (token) {
        const user = { 
            id: 13,
            name: "sebastian",
            email: "admin@kunsten.dk",
            admin: false,
            mediaPlanner: true
        };
		return user;
    }

    return null;

	/* try {
		const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your secret or public key
		return { user: decoded }; // Expose user info to the layout
	} catch {
		return false;
	} */
}