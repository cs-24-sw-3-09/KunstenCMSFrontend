
import { fail } from "@sveltejs/kit";

const API_URL = import.meta.env.SERVER_API_URL;

// Loads:
// - All users from db

/** @type {import("./$types").PageServerLoad */
export async function load({ locals, cookies }) {
    const users = await fetch(API_URL + "/api/users", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    const usersData = await users.json();

    return {
        users: usersData,
    };
}


// Actions:
// - New User
// - Edit User
// - Delete User

/** @type {import("./$types").Actions} */
export const actions = {
    newUser: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        // Checkboxes are sent as "on" or "off", so we need to convert them to booleans
        let data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            notificationState: formData.get("notificationState") === "on" ? true : false,
            mediaPlanner: formData.get("mediaPlanner") === "on" ? true : false,
            admin: formData.get("admin") === "on" ? true : false,
        }

        // Check feilds
        if (!data.firstName || !data.lastName || !data.email) {
            return fail(400, { error: "All input fields are required." });
        }

        // requestBody sendt for the post action
        let requestBody = data;

        // Validate requestBody
        if (!(Object.keys(requestBody).length === 7)) {
            return fail(400, { error: "All input fields are required." });
        }

        // Send the request to the backend
        const response = await fetch(API_URL + "/api/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 201) {
            return fail(response.status, { error: "Failed to create new user." });
        }

        // Fetch all users again
        const users = await fetch(API_URL + "/api/users", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        });

        const usersData = await users.json();

        if (users.status !== 200) {
            return fail(users.status, { error: "Failed to fetch users." });
        }

        return {
            success: true,
            usersData,
        };
    },

    editUser: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        // Extract old data from the form data
        const oldDataJson = formData.get("oldData"); // Get serialized JSON
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
            password: formData.get("newPassword")
        }

        // Find differeences
        let diff = {};
        for (const key in data) {
            if(key == "password") {
                if (data[key] == "") {
                    continue;           
                }
            }

            if (data[key] !== oldData[key]) {
                diff[key] = data[key];
            }
        }

        console.log(diff);

        // requestBody sendt for the patch action
        let requestBody = diff;
        requestBody.id = data.id;

        // Check requestBody
        if (!(Object.keys(requestBody).length > 1)) {
            return fail(400, { error: "At least one field needs to be changed." });
        }

        // Send the request to the backend
        const response = await fetch(API_URL + "/api/users/" + requestBody.id, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to edit user." });
        }

        // Fetch all users again
        const users = await fetch(API_URL + "/api/users", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        });
    
        const usersData = await users.json();

        return {
            success: true,
            usersData,
        };
    },

    deleteUser: async ({ cookies, url, request }) => {
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

        // Check feilds
        if (!data.id) {
            return fail(400, { error: "No id provided." });
        }

        // requestBody sendt for the delete action
        let requestBody = {};
        requestBody.id = data.id;

        // Validate requestBody
        /* if (!(Object.keys(requestBody).length === 1)) {
            return fail(400, { error: "Only the id field can be passed." });
        } */

        // Send the request to the backend
        const response = await fetch(API_URL + "/api/users/" + requestBody.id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 204) {
            return fail(response.status, { error: "Failed to delete user." });
        }

        // Fetch all users again
        const users = await fetch(API_URL + "/api/users", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        });
    
        const usersData = await users.json();


        return {
            success: true,
            usersData,
        };
    },
};