<script>
    import Button from "$lib/components/Button.svelte";
    let { usersData, onEdit, onDelete } = $props();

    // Import the "enhance" function from the "form" module.
    import { enhance } from '$app/forms';
</script>

<table>
    <tbody>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Notifications</th>
            <th>Roles</th>
            <th>Actions</th>
        </tr>
        {#each usersData as user}
            <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.notificationState ? "On" : "Off"}</td>
                <td>
                    {#if user.mediaPlanner && user.admin}
                        Admin, Media Planner
                    {:else if user.mediaPlanner}
                        Media Planner
                    {:else if user.admin}
                        Admin
                    {/if}
                </td>
                <td>
                    <Button text={"Edit"} clickFunction={() => onEdit(user)} />
                    <form action="?/deleteUser" method="post" use:enhance={({ formData, cancel }) => {
                        let confirmation = confirm(
                            "Are you sure you want to delete this user?",
                        );
                        if (!confirmation) return cancel();
                        
                        // `formData` is its `FormData` object that's about to be submitted
                        formData.set("id", user.id);
                        formData.set("firstName", user.firstName);
                        formData.set("lastName", user.lastName);
                        formData.set("email", user.email);
                        formData.set("notificationState", user.notificationState ? "on" : "off");
                        formData.set("mediaPlanner", user.mediaPlanner ? "on" : "off");
                        formData.set("admin", user.admin ? "on" : "off");
                    }}>
                        <Button type="submit" text={"Delete"}/>
                    </form>
                    
                </td>
            </tr>
        {/each}
    </tbody>
</table>
