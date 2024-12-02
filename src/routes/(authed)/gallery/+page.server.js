import { fail } from "@sveltejs/kit";
import { mimeToType } from "$lib/utils/fileutils";

const API_URL = import.meta.env.VITE_API_URL;

/** @type {import("./$types").PageServerLoad} */
export async function load({ cookies }) {

    const VisualMedia = await fetch(API_URL+"/api/visual_medias", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    })

    const visualMediasData = await VisualMedia.json();

    for (let i = 0; i < visualMediasData.content.length; i++) {
        visualMediasData.content[i].src = 
            API_URL + "/files/visual_media/" 
            + visualMediasData.content[i].id 
            + mimeToType(visualMediasData.content[i].fileType);
    }

    console.log(visualMediasData);
    
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
    newVisualMedia : async ({ cookies, url, request }) => {
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

        console.log("New Visual Media");
        console.log("requestBody");
        console.log(requestBody); */

        //console.log(formData);

        // Send the request to the backend
        const response = await fetch(API_URL+"/api/visual_medias", {
            method: "POST",
            headers: { 
                /* "Content-type": "multipart/form-data", */
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: formData,
        });

        //const responseData = await response.json();

        //console.log(responseData);
        //console.log(response.status);

        if (response.status !== 201) {
            return fail(response.status, { error: "Failed to create visual media." });
        }

        return { success: true };
    },

    editVisualMedia : async ({ cookies, url, request }) => {
        const formData = await request.formData();

        // Files are blobs
        let data = {
            id : formData.get("id"),
            name : formData.get("name"),
            description : formData.get("description"),
            file : formData.get("file"),
        }

        // Extract old data from the form data
        const oldDataJson = formData.get("oldData"); // Get serialized JSON
        const oldData = oldDataJson ? JSON.parse(oldDataJson) : null; // Parse back to an object

        // Find differeences, except for the file
        let diff = {};
        for (const key in data) {
            if (key === "file") { continue; }
            if (data[key] !== oldData[key]) {
                diff[key] = data[key];
            }
        }

        // requestBody sendt for the patch action
        let requestBody = diff;
        requestBody.id = data.id;
        if (data.file.size) { requestBody.file = data.file; }

        // Check requestBody
        if (!(Object.keys(requestBody).length > 1)) {
            return fail(400, { error: "At least one field needs to be changed." });
        }

        console.log("Edit Visual Media");
        console.log("requestBody");
        console.log(requestBody);
        
        // Send the request to the backend
        /* TODO */
        
        return { success: true };
    },

    deleteVisualMedia : async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        let data = {
            id : formData.get("id"),
            name : formData.get("name"),
            description : formData.get("description"),
            tags : formData.get("tags")
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

        console.log("Delete Visual Media");
        console.log("requestBody");
        console.log(requestBody);        

        // Send the request to the backend
        /* TODO */
        
        return { success: true };
    },

    addTagToVisualMedia : async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        let data = {
            id : formData.get("id"),
            tag : {text: formData.get("tag")},
        }

        // Check feilds
        if (!data.id || !data.tag) {
            return fail(400, { error: "No id or tag provided." });
        }

        // requestBody sendt for the action
        let requestBody = {
            id : data.id,
            tags : data.tag,
        };
        
        // Check requestBody
        if (!(Object.keys(requestBody).length === 2)) {
            return fail(400, { error: "Only the id and tag fields can be passed." });
        }
        
        console.log("Add Tag to Visual Media");
        console.log("requestBody");
        console.log(requestBody);

        // Send the request to the backend
        /* TODO */
        
        return { success: true };
    },

    deleteTagFromVisualMedia : async ({ cookies, url, request }) => {
        const formData = await request.formData();
        
        let data = {
            id : formData.get("id"),
            tag : {text: formData.get("tag")},
        }

        // Check feilds
        if (!data.id) {
            return fail(400, { error: "No id provided." });
        }

        // requestBody sendt for the delete action
        let requestBody = {};
        requestBody.id = data.id;
        requestBody.tags = data.tag;

        // Check requestBody
        /* if (!(Object.keys(requestBody).length === 2)) {
            return fail(400, { error: "Only the id and tag fields can be passed." });
        } */

        console.log("Delete Tag from Visual Media");
        console.log("requestBody");
        console.log(requestBody);

        // Send the request to the backend
        /* TODO */
        
        return { success: true };
    }
}