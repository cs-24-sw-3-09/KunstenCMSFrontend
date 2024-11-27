
import { fail } from "@sveltejs/kit";

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
        
        // Validate feilds
        if (!data.firstName || !data.lastName || !data.email ) {
            return fail(400, { error: "All input fields are required." });
        }

        // requestBody sendt for the post action
        let requestBody = data;
        
        // Validate requestBody
        if (!(Object.keys(requestBody).length === 6)) {
            return fail(400, { error: "All input fields are required." });
        }
        
        console.log("New User");
        console.log("requestBody");
        console.log(requestBody);
        
        // Send the request to the backend
        /* TODO */
        
        
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

        // requestBody sendt for the patch action
        let requestBody = diff;
        requestBody.id = data.id;

        // Validate requestBody
        if (!(Object.keys(requestBody).length > 1)) {
            return fail(400, { error: "At least one field needs to be changed." });
        }
        
        console.log("Edit User");
        console.log("requestBody");
        console.log(requestBody);
        
        // Send the request to the backend
        /* TODO */
        
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
        console.log(data);
        
        // Validate feilds
        if (!data.id) {
            return fail(400, { error: "No id provided." });
        }
        
        // requestBody sendt for the delete action
        let requestBody = {};
        requestBody.id = data.id;
        
        console.log("Delete User");
        console.log("requestBody");
        console.log(requestBody)

        // Validate requestBody
        /* if (!(Object.keys(requestBody).length === 1)) {
            return fail(400, { error: "Only the id field can be passed." });
        } */

        // Send the request to the backend
        /* TODO */
        
        return { success: true };
    },
};