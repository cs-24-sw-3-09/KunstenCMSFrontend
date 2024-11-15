// Guide in stores https://svelte.dev/docs/svelte/stores
import { writable } from 'svelte/store';

//export const userStore = writable({});
export const userStore = writable({
    firstname: "Søren",
    lastname: "Sørensen",
    email: "Søren0120@gmail.com",
    role: "Media Planner",
    notifications: true,
    pause_notifications: {
        from: "2024-11-01",
        to: "2024-11-30",
    },
});
// TODO: delete temp data

