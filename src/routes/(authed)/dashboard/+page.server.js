import { fail } from "@sveltejs/kit";

// Actions:
// - New Device
// - Edit Device

/** @type {import("./$types").Actions} */
export const actions = {
    newDevice : async ({ cookies, url, request }) => {
        const formData = await request.formData();

        // Resolution is a string of the form "WIDTHxHEIGHT"
        let data = {
            name: formData.get("name"),
            location: formData.get("location"),
            model: formData.get("model"),
            displayOrientation: formData.get("displayOrientation"),
            resolution: formData.get("width")+"x"+formData.get("height"),
        };

        // Validate feilds
        if (!data.name || !data.location || !data.model || !data.displayOrientation || !data.resolution) {
            return fail(400, { error: "All input fields are required." });
        }

        // requestBody sendt for the post action
        let requestBody = data;
        
        // Validate requestBody
        if (!(Object.keys(requestBody).length === 5)) {
            return fail(400, { error: "All input fields are required." });
        }
        
        console.log("New Device");
        console.log("requestBody");
        console.log(requestBody);
        
        // Send the request to the backend
        /* TODO */
        
        
        return { success: true };
    },
    
    editDevice : async ({ cookies, url, request }) => {
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
            resolution: formData.get("width")+"x"+formData.get("height"),
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

        // Validate requestBody
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