
import { fail } from "@sveltejs/kit";
const API_URL = import.meta.env.VITE_API_URL


/** @type {import("./$types").PageServerLoad} */
export async function load({ cookies }) {

    const slideshow = await fetch(API_URL + "/api/slideshows", {
        method: "GET",
        headers: {
            /* "Content-type": "application/json", */
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    const slideshowData = await slideshow.json();

    return {
        slideshow: slideshowData,
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
    getSlideshows: async({ cookies, url, request }) =>{
        const slideshow = await fetch(API_URL + "/api/slideshows", {
            method: "GET",
            headers: {
                /* "Content-type": "application/json", */
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        })
    
        const slideshowData = await slideshow.json();
    
        return {
            slideshow: slideshowData,
        };
    },
    newMediaToSLideshow: async ({ cookies, url, request }) => {
        const formData = await request.formData();

        //console.log(formData);

        //return fail(400, { error: "Not implemented yet." });

        return { success: true };
    },
    postNewSlideshow: async ({ cookies, url, request }) => {
        {
            const formData = await request.formData();
            //console.log(formData);
            const name = formData.get("name");
            // Extract old data from the form data


            // Check feilds
            if (!name) {
                return fail(400, { error: "All input fields are required." });
            }

            // requestBody sendt for the patch action
            const requestBody = "{\"name\": \""+name+"\", \"isArchived\":0}"; // Parse back to an object
            //console.log("joson "+requestBody)
            // Send the request to the backend        
            const response = await fetch(API_URL + "/api/slideshows", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + cookies.get("authToken"),
                },
                body: requestBody,
            });
            let responseData = await response.json();

            if (response.status !== 201) {
                return fail(response.status, { error: "Failed to post slideshow." });
            }

            responseData = await getSlideshows({ cookies, url, request });
            
            return { success: true,
                    newData: responseData,
             };
        }
    }
}

async function getSlideshows({ cookies, url, request }){
    const slideshow = await fetch(API_URL + "/api/slideshows", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    })

    let slideshowData = await slideshow.json();
    return slideshowData;
}