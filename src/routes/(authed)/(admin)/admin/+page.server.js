
import { fail, redirect } from "@sveltejs/kit";

// Actions:
// - New User
// - Edit User
// - Delete User

/** @type {import("./$types").Actions} */
export const actions = {
    newUser : async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        // Checkboxes are sent as "on" or "off", so we need to convert them to booleans
        let data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            notificationState: formData.get("notificationState") === "on" ? true : false,
            mediaPlanner: formData.get("mediaPlanner") === "on" ? true : false,
            admin: formData.get("admin") === "on" ? true : false,
        }
        
		// Log the data for debugging
        console.log("New User");
        console.log(data);
        
        // Validate feilds
        if (!data.firstName || !data.lastName || !data.email ) {
            return fail(400, { error: "All input fields are required." });
        }

        return { success: true };
    },

    editUser : async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        // Extract old data from the form data
        const oldDataJson = formData.get("oldUser"); // Get serialized JSON
        const oldData = oldDataJson ? JSON.parse(oldDataJson) : null; // Parse back to an object

        // Checkboxes are sent as "on" or "off", so we need to convert them to booleans
        let data = {
            id: formData.get("id"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            notificationState: formData.get("notificationState") === "on" ? true : false,
            mediaPlanner: formData.get("mediaPlanner") === "on" ? true : false,
            admin: formData.get("admin") === "on" ? true : false,
        }       

        // Find differeences
        let diff = {};
        for (const key in data) {
            if (data[key] !== oldData[key]) {
                diff[key] = data[key];
            }
        }

        // requestData sendt for the patch action
        let requestData = diff;
        requestData.id = data.id;

        console.log("requestData");
        console.log(requestData);

        if (Object.keys(diff).length > 0 && data.id) {
            /* TODO: PATCH THE USER */
        }

        

        return { success: true };
    },

    deleteUser : async ({ cookies, url, request }) => {
        const formData = await request.formData();
        // Checkboxes are sent as "on" or "off", so we need to convert them to booleans
        let data = {
            id: formData.get("id"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            notificationState: formData.get("notificationState") === "on" ? true : false,
            mediaPlanner: formData.get("mediaPlanner") === "on" ? true : false,
            admin: formData.get("admin") === "on" ? true : false,
        }
        
		// Log the data for debugging
        console.log("Delete User");
        console.log(data);
        
        // Validate feilds
        if (!data.firstName || !data.lastName || !data.email ) {
            return fail(400, { error: "All input fields are required." });
        }
        
        return { success: true };
    },


	/* login : async ({ cookies, url, request }) => {
		const formData = await request.formData();
		console.log(formData);

		const email = formData.get("email");
		console.log(email);

		const password = formData.get("password");
		console.log(password);

		// Validate the email field
        if (!email) {
            return fail(400, { error: "Email is required." });
        }

		// Validate the password field
        if (!password) {
            return fail(400, { error: "Password is required." });
        }

		// Validate the email and password fields
        if (!email || !password) {
            return fail(400, { error: "Email and password are required." });
        }



		// Mock validate the email and password
        if (email !== "admin@example.com" || password !== "password") {
            return fail(400, { error: "Invalid email or password." });
        }

		console.log(Logging in: ${email});

		// Respond with success
        return { success: true };

		//cookies.set("authToken", "true", { path: "/" });
		//redirect(303, url.searchParams.get("redirectTo") ?? "/dashboard");
	}, */
};