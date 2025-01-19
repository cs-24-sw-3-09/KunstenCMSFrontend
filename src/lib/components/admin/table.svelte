<script>
    import Button from "$lib/components/button.svelte";
    let { usersData, onEdit, updateUsersData, saveData } = $props();

    // Import the "enhance" function from the "form" module.
    import { enhance } from "$app/forms";
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
                    <form action="?/deleteUser" method="post"
                    use:enhance={({ formData, cancel }) => {
                        // Causes svelte violation warning, because of holdup
                        let confirmation = confirm(`Are you sure you want to delete "${user.firstName} ${user.lastName}"?`,);
                        
                        if (!confirmation) return cancel();
                        
                        // `formData` is its `FormData` object that's about to be submitted
                        for (const key in user) {
                            formData.set(key, user[key]);
                        }
                        
                        return async ({ result }) => {
                            // `result` is an `ActionResult` object
                            switch (result.type) {
                                case "success":
                                    // Handle the success
                                    updateUsersData(result.data.usersData.content);
                                    saveData(true);
                                    break;
                                case "failure":
                                    // Handle the error
                                    alert(`Failed to delete user, please reload page (F5).\n${result.data?.error}`,);
                                    saveData(false);
                                    break;
                            }
                        };
                    }}>
                        <Button type="submit" text={"Delete"} />
                    </form>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
