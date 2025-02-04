import { fail, redirect } from "@sveltejs/kit";

import { env } from "$env/dynamic/private";

// load user from locals for modifieing the page
/** @type {import("./$types").PageServerLoad} */
export async function load({ locals }) {
    return { 
        user: locals.user, 
    };
}

// Actions:
// - Edit User Profile
// - Change Password
// - notificationState
// - pauseNotifications


// Input validation
// Uses inbuild form 

/** @type {import("./$types").Actions} */
export const actions = {
    editProfile: async ({ cookies, url, request }) => {
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
        }

        // Check feilds
        if (!data.firstName || !data.lastName || !data.email) {
            return fail(400, { error: "All input fields are required." });
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

        // Check requestBody
        if (!(Object.keys(requestBody).length > 1)) {
            return fail(400, { error: "At least one field needs to be changed." });
        }

        // Send the request to the backend        
        const response = await fetch(env.SERVER_API_URL+"/api/account", {
            method: "PATCH",
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to update profile." });
        }

        const responseData = await response.json();

        // If email is changed, delete the authToken
        //if (responseData.email !== oldData.email) {
        if (requestBody.email) {
            cookies.delete('authToken', { path: '/' });
            redirect(303, "/login");
        }

        return { 
            success: true,
            responseData,
        };
    },
    changePassword: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        let data = {
            id: formData.get("id"),
            password: formData.get("password"),
            confpassword: formData.get("confpassword"),
        }

        // Check feilds
        if (!data.password || !data.confpassword) {
            return fail(400, { error: "All input fields are required." });
        }

        // Check passwords
        if (data.password !== data.confpassword) {
            return fail(400, { error: "Passwords do not match." });
        }

        // requestBody sendt for the patch action
        let requestBody = {
            password: data.password,
        };
        requestBody.id = data.id;

        // Check requestBody
        if (!(Object.keys(requestBody).length === 2)) {
            return fail(400, { error: "Wrong size of data in request body." });
        }

        // Send the request to the backend
        /* TODO */

        return { success: true };
    },
    notificationState: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        let data = {
            id: formData.get("id"),
            notificationState: formData.get("notificationState") ? true : false,
        };

        // Check if boolean
        if (typeof data.notificationState !== "boolean") {
            return fail(400, { error: "Wrong input type." });
        }

        // requestBody sendt for the patch action
        let requestBody = data;

        // Check requestBody
        if (!(Object.keys(requestBody).length === 2)) {
            return fail(400, { error: "Wrong size of data in request body." });
        }

        // Send the request to the backend        
        const response = await fetch(env.SERVER_API_URL+"/api/account", {
            method: "PATCH",
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });
        
        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to update profile." });
        }

        const responseData = await response.json();

        return { 
            success: true,
            responseData,
        };
    },
    pauseNotifications: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        let data = {
            id: formData.get("id"),
            pauseNotificationStart: formData.get("pauseNotificationStart"),
            pauseNotificationEnd: formData.get("pauseNotificationEnd"),
        }

        // Check feilds
        if (!data.pauseNotificationStart || !data.pauseNotificationEnd) {
            return fail(400, { error: "All input fields are required." });
        }

        // requestBody sendt for the patch action
        let requestBody = data;

        // Check requestBody
        if (!(Object.keys(requestBody).length === 3)) {
            return fail(400, { error: "Wrong size of data in request body." });
        }

        // Send the request to the backend    
        const response = await fetch(env.SERVER_API_URL+"/api/account", {
            method: "PATCH",
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        
        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to update profile." });
        }
        
        const responseData = await response.json();

        return { 
            success: true,
            responseData,
        };
    },
    unpauseNotifications : async ({ cookies, url, request }) => {
        const formData = await request.formData();

        let requestBody = {
            id: formData.get("id"),
            pauseNotificationStart: formData.get("pauseNotificationStart"),
            pauseNotificationEnd: formData.get("pauseNotificationEnd"),
        } 

        const response = await fetch(env.SERVER_API_URL+"/api/account", {
            method: "PATCH",
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });
        
        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to update profile." });
        }

        const responseData = await response.json();

        return { 
            success: true,
            responseData,
        };
    },
}