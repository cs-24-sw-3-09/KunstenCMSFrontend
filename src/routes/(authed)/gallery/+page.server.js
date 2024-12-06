import { fail, redirect } from "@sveltejs/kit";
import { mimeToType } from "$lib/utils/fileutils";

import { env } from "$env/dynamic/private";

/** @type {import("./$types").PageServerLoad} */
export async function load({ cookies }) {

    
    const tags = await fetch(env.SERVER_API_URL + "/api/tags", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    })
    
    const tagsData = await tags.json();
    
    const visualMedia = await fetch(env.SERVER_API_URL + "/api/visual_medias", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });
    
    const visualMediasData = await visualMedia.json();
    
    for (let i = 0; i < visualMediasData.content.length; i++) {
        visualMediasData.content[i].src =
        env.CLIENT_API_URL + "/files/visual_media/"
        + visualMediasData.content[i].id
        + mimeToType(visualMediasData.content[i].fileType);
    }
    
    for (let i = 0; i < visualMediasData.content.length; i++) {
        const slideshows = await fetch(env.SERVER_API_URL + "/api/visual_medias/" + visualMediasData.content[i].id + "/slideshows", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        });

        const slideshowsData = await slideshows.json();
        visualMediasData.content[i].slideshows = slideshowsData;
    }

    //console.log(visualMediasData);
    
    return {
        visualMedias: visualMediasData,
    };
}

// Actions:
// - New VisualMedia
// - Edit VisualMedia
// - Delete VisualMedia
// - Add Tag to VisualMedia
// - Delete Tag from VisualMedia

// Input validation
// Uses inbuild form 

/** @type {import("./$types").Actions} */
export const actions = {
    newVisualMedia: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        /* 
        // Tags are an array of objects, where each object has a text property
        // Files are blobs
        let data = {
            name : formData.get("name"),
            description : formData.get("description"),
            tags : formData
                   .get("tags")
                   .split(",") // Split by commas
                   .map((tag) => tag.trim()) // Trim whitespace
                   .filter((tag) => tag !== "") // Filter out empty strings
                   .map((tag) => ({ text: tag.toLowerCase() })), // Convert to lowercase and wrap in an object
            file : formData.get("file"),
        }

        // Check feilds
        if (!data.name || !data.description || !data.tags || !data.file) {
            return fail(400, { error: "All input fields are required." });
        }

        // requestBody sendt for the post action
        let requestBody = data;
        
        // Check requestBody
        if (!(Object.keys(requestBody).length === 4)) {
            return fail(400, { error: "All input fields are required." });
        }
        */

        // Send the request to the backend
        const response = await fetch(env.SERVER_API_URL + "/api/visual_medias", {
            method: "POST",
            headers: {
                /* "Content-type": "multipart/form-data", */
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: formData,
        });

        const responseData = await response.json();

        responseData.src = env.CLIENT_API_URL + responseData.location;

        if (response.status !== 201) {
            return fail(response.status, { error: "Failed to create visual media." });
        }

        return {
            success: true,
            responseData,
        };
    },

    editVisualMedia: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        // Files are blobs
        let data = {
            id: parseInt(formData.get("id")),
            name: formData.get("name"),
            description: formData.get("description"),
        }

        // Extract old data from the form data
        const oldDataJson = formData.get("oldData"); // Get serialized JSON
        const oldData = oldDataJson ? JSON.parse(oldDataJson) : null; // Parse back to an object

        // Find differeences, except for the file
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
        const response = await fetch(env.SERVER_API_URL + "/api/visual_medias/" + data.id, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        })

        // Get the response data and add the src and slideshows
        //console.log(response.status);
        const responseData = await response.json();
        //console.log(response.status);

        //console.log(responseData);

        // if video, no src as it is not iamge element compatable
        if (responseData.fileType != "video/mp4") {
            responseData.src = env.CLIENT_API_URL + responseData.location;
        }
        
        const slideshows = await fetch(env.SERVER_API_URL + "/api/visual_medias/" + responseData.id + "/slideshows", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
        });

        const slideshowsData = await slideshows.json();

        responseData.slideshows = slideshowsData;

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to update visual media." });
        }

        /* TODO, repalce file post/patch */

        return { 
            success: true,
            responseData,
        };
    },
    replaceVisualMedia: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        
        const response = await fetch(env.SERVER_API_URL + "/api/" + formData.get("id") + "file", {
            method: "POST",
            headers: {
                /* "Content-type": "multipart/form-data", */
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: formData,
        });

        if (!(response.status >= 200 && response.status < 300)) {
            return fail(response.status, { error: "Failed to replace visual media." });
        }


        return { 
            success: true,
        };
    },
    deleteVisualMedia: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        

        let data = {
            id: formData.get("id"),
        }

        // Check feilds
        if (!data.id) {
            return fail(400, { error: "No id provided." });
        }

        // requestBody sendt for the delete action
        let requestBody = {};
        requestBody.id = data.id;

        // Check requestBody
        /* if (!(Object.keys(requestBody).length === 1)) {
            return fail(400, { error: "Only the id field can be passed." });
        } */

        // Send the request to the backend
        const response = await fetch(env.SERVER_API_URL + "/api/visual_medias/" + data.id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
        });

        if (response.status !== 204) {
            return fail(response.status, { error: "Failed to delete visual media." });
        }

        return { 
            success: true,
            id: data.id,
        };
    },

    addTagToVisualMedia: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        let data = {
            id: formData.get("id"),
            tagText: formData.get("tag").toLowerCase(),
        }

        // Check feilds
        if (!data.id || !data.tagText) {
            return fail(400, { error: "No id or tag provided." });
        }

        // requestBody sendt for the action
        let requestBody = {
            tagText: data.tagText,
        };

        // Check requestBody
        if (!(Object.keys(requestBody).length === 1)) {
            return fail(400, { error: "Tag fields can be passed to server." });
        }

        // Send the request to the backend
        const response = await fetch(env.SERVER_API_URL + "/api/visual_medias/" + data.id + "/tags", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 200) {
            return fail(response.status, { error: "Failed to add tag to visual media." });
        }

        const responseData = await response.json();

        return { 
            success: true,
            responseData,
        };
    },

    deleteTagFromVisualMedia: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        let data = {
            id: formData.get("id"),
            tagId: formData.get("tagid"),
        }

        // Check feilds
        if (!data.id || !data.tagId) {
            return fail(400, { error: "No media id or tag id provided." });
        }

        // requestBody sendt for the delete action
        let requestBody = {};
        requestBody.tagId = data.tagId;

        // Send the request to the backend
        const response = await fetch(env.SERVER_API_URL + "/api/visual_medias/" + data.id + "/tags", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 204) {
            return fail(response.status, { error: "Failed to delete tag to visual media." });
        }

        //console.log(response.status);
        //const responseData = await response.json();
        //console.log(responseData);

        return { 
            success: true,
            //responseData,
            tagId: data.tagId,
        };
    },
};