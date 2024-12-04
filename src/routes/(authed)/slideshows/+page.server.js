
import { fail } from "@sveltejs/kit";
import { slide } from "svelte/transition";
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
    updateVMIForSS: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        //console.log(formData)
        let slideshow = JSON.parse(formData.get("slideshow"));
        let newDuration = formData.get("newDuration");
        let VMI = JSON.parse(formData.get("VMI"));

        slideshow.visualMediaInclusionCollection.find(vmi => vmi.id === VMI.id).slideDuration = newDuration;

        // Constructing the requestBody as a JSON object
        const requestBody = JSON.stringify(slideshow);
        const returnData = await fetch(API_URL + "/api/slideshows/" + slideshow.id, {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + cookies.get("authToken"),
                "Content-Type": "application/json", // Indicate JSON content
            },
            body: requestBody,
        });
        return {
            success: true,
        };
    },
    deleteSlideshow: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        const slideshow = await fetch(API_URL + "/api/slideshows/" + formData.get("slideshowID"), {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        })

        if (slideshow.status == 404) {
            return fail(slideshow.status, { error: "Could not find the slideshow." });
        } else if (slideshow.status !== 204) {
            return fail(slideshow.status, { error: "Failed to delete slideshow." });
        }

        let newSlideshowData = await getSlideshows({ cookies, url, request });
        return {
            success: true,
            newData: newSlideshowData,
        };
    },
    deleteVM: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        const visualmedia = await fetch(API_URL + "/api/visual_media_inclusions/" + formData.get("ContentID"), {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + cookies.get("authToken"),
            }
        })
        console.log(visualmedia)
        if (visualmedia.status == 404) {
            return fail(visualmedia.status, { error: "Could not find the visual media." });
        } else if (visualmedia.status !== 204) {
            return fail(visualmedia.status, { error: "Failed to delete visual media." });
        }

        let newSlideshowData = await getSlideshows({ cookies, url, request });
        return {
            success: true,
            newData: newSlideshowData,
        };
    },
    changeArchviedState: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        console.log("From state server", formData);

        // Constructing the requestBody as a JSON object
        const requestBody = JSON.stringify({
            isArchived: formData.get("isArchived"), // Convert formData value to JSON
        });

        const slideshow = await fetch(API_URL + "/api/slideshows/" + formData.get("slideshowID"), {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + cookies.get("authToken"),
                "Content-Type": "application/json", // Indicate JSON content
            },
            body: requestBody,
        });

        const slideshowData = await slideshow.json();
        if (slideshow.status == 404) {
            console.log("herer1234")
            return fail(slideshow.status, { error: "Could not find the slideshow." });
        } else if (slideshow.status != 200) {
            return fail(slideshow.status, { error: "Failed to change archived state for slideshow." });
        }

        let newSlideshowData = await getSlideshows({ cookies, url, request });
        return {
            success: true,
            newData: newSlideshowData,
        };
    },
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
        //console.log("sspos", formData.get("ssPos"));

        // requestBody sendt for the patch action
        let requestBody = JSON.stringify({
            id: 0,
            slideDuration: 25,
            slideshowPosition: formData.get("ssPos"),
            visualMedia: {
                id: formData.get("id"),
                type: "visualMedia",
            },
        });

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
        let newVMIId = responseData.id

        // Send the request to the backend     
        requestBody = JSON.stringify({
            visualMediaInclusionId: newVMIId
        });
        const secondResponse = await fetch(API_URL + "/api/slideshows/" + formData.get("ssId") + "/visual_media_inclusions", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookies.get("authToken"),
            },
            body: requestBody,
        });

        responseData = await secondResponse.json();
        console.log("status", response.status, secondResponse.status)
        if (response.status !== 201 || secondResponse.status !== 200) {
            return fail(response.status, { error: "Failed to add visual media to slideshow." });
        }

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
    },
    patchNewVMIOrder: async ({ cookies, url, data, request }) => {
        const formData = await request.formData();
        let slideOrder = JSON.parse(formData.get("Slideorder"));
        console.log(slideOrder);
        return {
            success: true,
        };
    },
    patchSSName: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        console.log(formData)

        const requestObj = { id: formData.get("slideshowId"), name: formData.get("newName") }
        const requestBody = JSON.stringify(requestObj);
        console.log(requestBody)

        const returnData = await fetch(API_URL + "/api/slideshows/" + formData.get("slideshowId"), {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + cookies.get("authToken"),
                "Content-Type": "application/json", // Indicate JSON content
            },
            body: requestBody,
        });
        return {
            success: true,
        };
    },
    cloneSS: async ({ cookies, url, request }) => {
        const formData = await request.formData();
        const slideshow = JSON.parse(formData.get("slideshow"));
        //console.log(slideshow)

        const requestObj = { name: slideshow.name + " - clone" }
        const requestBody = JSON.stringify(requestObj);
        console.log(requestBody)
        console.log(slideshow.id)

        const returnData = await fetch(API_URL + "/api/slideshows/" + slideshow.id + "/duplicate", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + cookies.get("authToken"),
                "Content-Type": "application/json", // Indicate JSON content
            },
            body: requestBody,
        });

        if (returnData.status == 404) {
            return fail(returnData.status, { error: "Could not find the slideshow." });
        } else if (returnData.status != 201) {
            return fail(returnData.status, { error: "Failed to duplicate slideshow." });
        }

        let newSlideshowData = await getSlideshows({ cookies, url, request });
        return {
            success: true,
            newData: newSlideshowData,
        };
    },
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

