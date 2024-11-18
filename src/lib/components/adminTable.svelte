<script>
    import Button from '$lib/components/Button.svelte';
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
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.notifications}</td>
                <td>
                    {#if user.roles.length === 0}
                        none
                    {:else if user.roles.length === 1}
                        {user.roles[0]}
                    {:else}
                        {#each user.roles as role}
                            {#if role === user.roles[user.roles.length - 1]}
                                {role}
                            {:else}
                                {role},&nbsp;
                            {/if}
                        {/each}
                    {/if}
                </td>
                <td>
                    <Button text={"Edit"} clickFunction={() => (onEdit(user))} />
                    <Button text={"Delete"} clickFunction={() => (onDelete(user))} />
                </td>
            </tr>
        {/each}
    </tbody>
</table>