<script>
    let { data, form } = $props(); // Is automatically populated by SvelteKit

    import Button from "$lib/components/button.svelte";
    import Table from "$lib/components/admin/table.svelte";
    import EditModal from "$lib/components/admin/editmodal.svelte";
    import NewModal from "$lib/components/admin/newmodal.svelte";

    // Subscribe to the usersStore to get the users data
    let usersData = $state(data.users.content);
    //$inspect(usersData);

    function updateUsersData(users) {
        usersData = users;
    }

    // Temp variable to store the user that is being edited, deleted or created
    let userFocus = $state({});

    // Modal visibility variables
    let showNewUserModal = $state(false);
    let showEditUserModal = $state(false);

    function toggleNewUserModal(user = userFocus) {
        userFocus = user;
        showNewUserModal = !showNewUserModal;
    }

    function toggleEditUserModal(user = userFocus) {
        userFocus = user;
        showEditUserModal = !showEditUserModal;
    }
</script>

<div class="main-content">
    <div class="page">
        <div class="page-header">
            <h2>Users:</h2>
            <Button text={"New User"} clickFunction={toggleNewUserModal} />
        </div>
        <Table {usersData} onEdit={toggleEditUserModal} updateUsersData={updateUsersData} {form} />
    </div>
</div>
{#if showNewUserModal}
    <NewModal doClose={toggleNewUserModal} updateUsersData={updateUsersData} />
{/if}
{#if showEditUserModal}
    <EditModal doClose={toggleEditUserModal} user={userFocus} updateUsersData={updateUsersData} />
{/if}

<style>
    @import "$lib/styles/button.css";
    @import "$lib/styles/admin.css";
</style>
