import { fail } from "@sveltejs/kit";

import { mimeToType } from "$lib/utils/fileutils";

import { env } from "$env/dynamic/private";

// load user from locals for modifieing the page
/** @type {import("./$types").PageServerLoad} */
export async function load({ locals, cookies }) {

    const displayDevices = await fetch(env.SERVER_API_URL + "/api/display_devices", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    })

    const displayDevicesData = await displayDevices.json();
    

    // Return data to the page
    // displayDevicesData
    return {
        displayDevices: displayDevicesData,
    };
}

// Actions:
// - New Device
// - Edit Device

/** @type {import("./$types").Actions} */
export const actions = {
    newDevice: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        // Resolution is a string of the form "WIDTHxHEIGHT"
        // Hacky way to get id and type from formdata
        let data = {
            name: formData.get("name"),
            location: formData.get("location"),
            /* model: formData.get("model"), */
            displayOrientation: formData.get("displayOrientation").toLowerCase(),
            resolution: formData.get("width") + "x" + formData.get("height"),
            fallbackContent: {
                id: JSON.parse(formData.get("fallbackContent")).id,
                type: JSON.parse(formData.get("fallbackContent")).type,
            },
        };

        // Check feilds
        if (!data.name || !data.location || !data.displayOrientation || !data.resolution) {
            return fail(400, { error: "All input fields are required. error1" });
        }

        // requestBody sendt for the post action
        let requestBody = data;

        // Send the request to the backend
        const response = await fetch(env.SERVER_API_URL + "/api/display_devices?forceDimensions=true", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        if (response.status !== 201) {
            return fail(response.status, { error: "Failed to create new device." });
        }

        return {
            success: true,
            responseData
        };
    },
    editDevice: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        // Extract old data from the form data
        const oldDataJson = formData.get("oldData"); // Get serialized JSON
        const oldData = oldDataJson ? JSON.parse(oldDataJson) : null; // Parse back to an object

        // Resolution is a string of the form "WIDTHxHEIGHT"
        let data = {
            id: formData.get("id"),
            name: formData.get("name"),
            location: formData.get("location"),
            /* model: formData.get("model"), */
            displayOrientation: formData.get("displayOrientation"),
            resolution: formData.get("width") + "x" + formData.get("height"),
            fallbackContent: {
                id: JSON.parse(formData.get("fallbackContent")).id,
                type: JSON.parse(formData.get("fallbackContent")).type,
            },
        };

        console.log(JSON.parse(formData.get("fallbackContent")))

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
        const response = await fetch(env.SERVER_API_URL + "/api/display_devices/" + requestBody.id + "?forceDimensions=true", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to edit device." });
        }

        return {
            success: true,
            responseData,
        };
    },
    deleteDevice: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        const id = formData.get("id");

        // Send the request to the backend
        const response = await fetch(env.SERVER_API_URL + "/api/display_devices/" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        });

        if (response.status !== 204) {
            return fail(response.status, { error: "Failed to delete device." });
        }

        return {
            success: true,
        };
    }
}