import { fail } from "@sveltejs/kit";

const API_URL = import.meta.env.VITE_API_URL;

// load user from locals for modifieing the page
/** @type {import("./$types").PageServerLoad} */
export async function load({ locals, cookies }) {

    const displayDevices = await fetch(API_URL + "/api/display_devices", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    })

    const displayDevicesData = await displayDevices.json();

    const visualMedia = await fetch(API_URL + "/api/visual_medias", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    let visualMediasData = await visualMedia.json();

    visualMediasData = visualMediasData.content.map(visualMedia => {
        return { ...visualMedia, type: "visualMedia" }
    });


    const slideshows = await fetch(API_URL + "/api/slideshows", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    let slideshowsData = await slideshows.json();

    slideshowsData = slideshowsData.map(slideshow => {
        return { ...slideshow, type: "slideshow" }
    });

    //console.log(visualMediasData.concat(slideshowsData));

    return {
        displayDevices: displayDevicesData,
        fallbackContent: visualMediasData.concat(slideshowsData),
    };
}

// Actions:
// - New Device
// - Edit Device

/** @type {import("./$types").Actions} */
export const actions = {
    newDevice: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        //console.log(formData.get("fallbackContent"));
        //console.log(JSON.parse(formData.get("fallbackContent")));
        
        // Resolution is a string of the form "WIDTHxHEIGHT"
        // Hacky way to get id and type from formdata
        let data = {
            name: formData.get("name"),
            location: formData.get("location"),
            model: formData.get("model"),
            displayOrientation: formData.get("displayOrientation").toLowerCase(),
            resolution: formData.get("width") + "x" + formData.get("height"),
            fallbackContent: {
                id: JSON.parse(formData.get("fallbackContent")).id,
                type: JSON.parse(formData.get("fallbackContent")).type,
            },
        };

        // Check feilds
        if (!data.name || !data.location || !data.model || !data.displayOrientation || !data.resolution) {
            return fail(400, { error: "All input fields are required. error1" });
        }

        // requestBody sendt for the post action
        let requestBody = data;

        console.log("New Device");
        console.log("requestBody");
        console.log(requestBody);

        // Send the request to the backend
        const response = await fetch(API_URL + "/api/display_devices", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        console.log(response.status);

        if (response.status !== 201) {
            return fail(response.status, { error: "Failed to create new device." });
        }

        return { success: true };
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
            model: formData.get("model"),
            displayOrientation: formData.get("displayOrientation"),
            resolution: formData.get("width") + "x" + formData.get("height"),
        };

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

        console.log("Edit Device");
        console.log("requestBody");
        console.log(requestBody);

        // Send the request to the backend
        /* TODO */

        return { success: true };
    },
}