import { fail } from "@sveltejs/kit";

import { mimeToType } from "$lib/utils/fileutils";

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

    //console.log(displayDevicesData);


    // Add src to visualMedia fallbackContent
    for (let i = 0; i < displayDevicesData.content.length; i++) {
        if (displayDevicesData.content[i].fallbackContent.type == "visualMedia") {
            displayDevicesData.content[i].fallbackContent.src = 
                API_URL + "/files/visual_media/"
                + displayDevicesData.content[i].fallbackContent.id
                + mimeToType(displayDevicesData.content[i].fallbackContent.fileType);
        }
    }

    // Add src to slideshow fallbackContent.visualMediaInclusionCollection[i].visualMedia 
    for (let i = 0; i < displayDevicesData.content.length; i++) {
        if (displayDevicesData.content[i].fallbackContent.type == "slideshow") {
            for (let j = 0; j < displayDevicesData.content[i].fallbackContent.visualMediaInclusionCollection.length; j++) {
                displayDevicesData.content[i].fallbackContent.visualMediaInclusionCollection[j].visualMedia.src = 
                    API_URL + "/files/visual_media/"
                    + displayDevicesData.content[i].fallbackContent.visualMediaInclusionCollection[j].visualMedia.id
                    + mimeToType(displayDevicesData.content[i].fallbackContent.visualMediaInclusionCollection[j].visualMedia.fileType);
            }
        }
    }

    // Add src to all visualMedias for content of timeslots
    for (let i = 0; i < displayDevicesData.content.length; i++) {
        for (let j = 0; j < displayDevicesData.content[i].timeSlots.length; j++) {
            if (displayDevicesData.content[i].timeSlots[j].displayContent.type == "visualMedia") {
                displayDevicesData.content[i].timeSlots[j].displayContent.src = 
                    API_URL + "/files/visual_media/"
                    + displayDevicesData.content[i].timeSlots[j].displayContent.id
                    + mimeToType(displayDevicesData.content[i].timeSlots[j].displayContent.fileType);
            }
        }
    }

    // Add src to all visualMediaInclusionCollection[i].visualMedia for content of timeslots with slideshows
    for (let i = 0; i < displayDevicesData.content.length; i++) {
        for (let j = 0; j < displayDevicesData.content[i].timeSlots.length; j++) {
            if (displayDevicesData.content[i].timeSlots[j].displayContent.type == "slideshow") {
                for (let k = 0; k < displayDevicesData.content[i].timeSlots[j].displayContent.visualMediaInclusionCollection.length; k++) {
                    displayDevicesData.content[i].timeSlots[j].displayContent.visualMediaInclusionCollection[k].visualMedia.src = 
                        API_URL + "/files/visual_media/"
                        + displayDevicesData.content[i].timeSlots[j].displayContent.visualMediaInclusionCollection[k].visualMedia.id
                        + mimeToType(displayDevicesData.content[i].timeSlots[j].displayContent.visualMediaInclusionCollection[k].visualMedia.fileType);
                }
            }
        }
    }
    

    // Return data to the page
    // displayDevicesData - data for the display devices, with src for all visual media (hopefully)
    // fallbackBontent - a collection of all visual medias and slideshows for the dropdown in the form
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
        const response = await fetch(API_URL + "/api/display_devices", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        console.log(response.status);

        const responseData = await response.json();

        console.log(responseData);

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

        /* console.log("Edit Device");
        console.log("requestBody");
        console.log(requestBody); */

        // Send the request to the backend
        const response = await fetch(API_URL + "/api/display_devices/" + requestBody.id, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        console.log(response.status);

        const responseData = await response.json();

        //console.log(responseData);

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
        const response = await fetch(API_URL + "/api/display_devices/" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        });

        console.log(response.status);

        if (response.status !== 204) {
            return fail(response.status, { error: "Failed to delete device." });
        }

        return {
            success: true,
        };
    }
}