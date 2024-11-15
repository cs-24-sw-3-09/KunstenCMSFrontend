import { writable } from "svelte/store";

// Initialise store with empty array, used to store freshests device data
//export const deviceStore = writable([]);
export const deviceStore = writable([
    {
        content: "",
        location: "Loc1",
        title: "Title1",
        slideshow: "Event1",
        status: "active",
        fallback: "Event1",
    },
    {
        content: "",
        location: "Loc2",
        title: "Title2",
        slideshow: "Event2",
        status: "inactive",
        fallback: "Event1",
    },
    {
        content: "",
        location: "Loc3",
        title: "Title3",
        slideshow: "123",
        status: "active",
        fallback: "Event1",
    },
    {
        content: "",
        location: "Loc4",
        title: "Title4",
        slideshow: "12312312312",
        status: "inactive",
        fallback: "Event1",
    },
    {
        content: "",
        location: "Loc4",
        title: "Title4",
        slideshow: "asdasszx",
        status: "active",
        fallback: "Event1",
    },
    /* {
        content: "",
        location: "Loc4",
        title: "Title4",
        slideshow: "zxczfaefew",
        status: "inactive",
        fallback: "Event1",
    },
    {
        content: "",
        location: "Loc723423",
        title: "Title4",
        slideshow: "lkmlkmpø",
        status: "active",
        fallback: "Event1",
    },
    {
        content: "",
        location: "Loc4",
        title: "Title4",
        slideshow: "wælknamefæwklen",
        status: "inactive",
        fallback: "Event1",
    }, */
]);
