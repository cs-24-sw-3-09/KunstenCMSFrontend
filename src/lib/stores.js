import { writable } from "svelte/store";

// Initialise store with empty array, used to store freshests device data
export const deviceStore = writable([
    {
        content: "",
        location: "Loc1",
        title: "Title1",
        title_location: "Location1",
        status: "active"
    },
    {
        content: "",
        location: "Loc2",
        title: "Title2",
        title_location: "Location2",
        status: "inactive"
    },
    {
        content: "",
        location: "Loc3",
        title: "Title3",
        title_location: "Location3",
        status: "active",
    },
    {
        content: "",
        location: "Loc4",
        title: "Title4",
        title_location: "Location4",
        status: "inactive",
    },
    {
        content: "",
        location: "Loc4",
        title: "Title4",
        title_location: "Location4",
        status: "active",
    },
    {
        content: "",
        location: "Loc4",
        title: "Title4",
        title_location: "Location4",
        status: "inactive",
    },
    {
        content: "",
        location: "Loc4",
        title: "Title4",
        title_location: "Location4",
        status: "active",
    },
    {
        content: "",
        location: "Loc4",
        title: "Title4",
        title_location: "Location4",
        status: "inactive",
    },
]);
