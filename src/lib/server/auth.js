
/** @type {import('@sveltejs/kit').RequestEvent} */
export async function authenticateUser({ request, cookies }) {

	const token = cookies.get('authToken');
	
    if (token) {
        const user = { 
            id: 13,
            firstName: "Sebastian",
            lastName: "Lorenzen",
            email: "admin@kunsten.dk",
            pauseNotificationStart: "2024/12/20",
            pauseNotificationEnd: "2024/12/30",
            notificationState: true,
            mediaPlanner: true,
            admin: true,
        
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