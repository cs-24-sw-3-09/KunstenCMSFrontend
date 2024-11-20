<script>
    import Button from "$lib/components/Button.svelte";
    let { usersData, onEdit, onDelete } = $props();
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
                    <Button
                        text={"Delete"}
                        clickFunction={() => onDelete(user)}
                    />
                </td>
            </tr>
        {/each}
    </tbody>
</table>
