const API_URL = import.meta.env.VITE_API_URL

export default async function updateVMIForSS(slideshow) {
    console.table(slideshow)

    // Constructing the requestBody as a JSON object
    const requestBody = JSON.stringify(slideshow);
    console.log(requestBody)

    const slideshow = await fetch(API_URL + "/api/slideshows/" + 0, {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + cookies.get("authToken"),
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