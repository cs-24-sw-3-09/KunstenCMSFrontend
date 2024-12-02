import { fail, redirect } from "@sveltejs/kit";

const API_URL = import.meta.env.VITE_API_URL;

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

        //console.log("Edit User");
        //console.log("requestBody");
        //console.log(requestBody);

        // Send the request to the backend        
        const response = await fetch(API_URL+"/api/account", {
            method: "PATCH",
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        //console.log(responseData);
        //console.log(response.status);

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to update profile." });
        }

        if (requestBody.email) {
            cookies.delete('authToken', { path: '/' });
        }

        
        




        return { 
            success: true,
            data: responseData,
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

        console.log("Change Password");
        console.log("requestBody");
        console.log(requestBody);

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

        //console.log("notificationState");
        //console.log("requestBody");
        //console.log(requestBody);

        // Send the request to the backend
        // Send the request to the backend        
        const response = await fetch(API_URL+"/api/account", {
            method: "PATCH",
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        //console.log(responseData);
        //console.log(response.status);

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to update profile." });
        }

        return { success: true };
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

        //console.log("Pause Notifications");
        //console.log("requestBody");
        //console.log(requestBody);

        // Send the request to the backend
        // Send the request to the backend        
        const response = await fetch(API_URL+"/api/account", {
            method: "PATCH",
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        //console.log(responseData);
        //console.log(response.status);

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to update profile." });
        }

        return { success: true };
    }
}