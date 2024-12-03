const API_URL = import.meta.env.VITE_API_URL

export default async function updateVMIForSS(slideshow, newDuration, VMI) {
    console.table(slideshow)
    console.log(slideshow.visualMediaInclusionCollection.find(vmi => vmi.id === VMI.id).slideDuration);
    slideshow.visualMediaInclusionCollection.find(vmi => vmi.id === VMI.id).slideDuration = newDuration;

    // Constructing the requestBody as a JSON object
    const requestBody = JSON.stringify(slideshow);
    console.log(requestBody)

    const returnData = await fetch(API_URL + "/api/slideshows/" + 0, {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + getCookie("authToken"),
            "Content-Type": "application/json", // Indicate JSON content
        },
        body: requestBody,
    });

    // const slideshowData = await slideshow.json();
    // if (slideshow.status == 404) {
    //     return fail(slideshow.status, { error: "Could not find the slideshow." });
    // } else if (slideshow.status != 200) {
    //     return fail(slideshow.status, { error: "Failed to change archived state for slideshow." });
    // }

    return {
        success: true,
    };
}


function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}