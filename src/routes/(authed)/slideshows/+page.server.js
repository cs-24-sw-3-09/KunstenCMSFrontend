
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


    const visualMedia = await fetch(API_URL + "/api/visual_medias", {
        method: "GET",
        headers: {
            /* "Content-type": "application/json", */
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    });

    const visualMediaData = await visualMedia.json();
    return {
        slideshow: slideshowData,
        visualMedia: visualMediaData,
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
    getSlideshows: async ({ cookies, url, request }) => {
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
    newMediaToSlideshow: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        //console.log("formdata123", formData)

        // Check feilds
        if (!formData.get("name")) {
            return fail(400, { error: "did not pick an Visual Media" });
        }

        // requestBody sendt for the patch action
        let requestBody = "{\"id\": 0, \"slideDuration\": 25, \"slideshowPosition\": "+ formData.get("ssPos")+", \"visualMedia\": {\"id\": " + formData.get("id") + ", \"type\": \"visualMedia\"}}";
        //console.log("resbody", requestBody)
        //console.log("joson "+requestBody)
        // Send the request to the backend        
        const response = await fetch(API_URL + "/api/visual_media_inclusions", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: requestBody,
        });
        let responseData = await response.json();
        //console.log("resData", responseData.id)
        let newVMIId = responseData.id

        //console.log("resbody", requestBody)
        //console.log("ssid", formData.get("ssId"))
        //console.log("joson "+requestBody)
        // Send the request to the backend     
        requestBody = "{\"visualMediaInclusionId\": " + newVMIId + "}"
        const secondResponse = await fetch(API_URL + "/api/slideshows/" + formData.get("ssId") + "/visual_media_inclusions", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: requestBody,
        });

        responseData = await secondResponse.json();

        //return fail(400, { error: "Not implemented yet." });

        let newSlideshowData = await getSlideshows({ cookies, url, request });
        return {
            success: true,
            newData: newSlideshowData,
        };
    },
    postNewSlideshow: async ({ cookies, url, request }) => {
        {
            const formData = await request.formData();
            const name = formData.get("name");
            // Extract old data from the form data


            // Check feilds
            if (!name) {
                return fail(400, { error: "All input fields are required." });
            }

            // requestBody sendt for the patch action
            const requestBody = "{\"name\": \"" + name + "\", \"isArchived\":0}"; // Parse back to an object
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

            return {
                success: true,
                newData: responseData,
            };
        }
    }
}

async function getSlideshows({ cookies, url, request }) {
    const slideshow = await fetch(API_URL + "/api/slideshows", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + cookies.get("authToken"),
        }
    })

    let slideshowData = await slideshow.json();
    return slideshowData;
}