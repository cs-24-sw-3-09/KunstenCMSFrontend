<script>
    import Button from "$lib/components/Button.svelte";
    import Table from "$lib/components/adminTable.svelte";
    import EditModal from "$lib/components/adminEdit.svelte";
    import NewModal from "$lib/components/adminNew.svelte";
    import { testUsers } from "$lib/testdata.js";

    // Subscribe to the usersStore to get the users data
    let usersData = $state([]);
    usersData = testUsers;

    // Temp variable to store the user that is being edited, deleted or created
    let userFocus = $state({});

    // Modal visibility variables
    let showNewUserModal = $state(false);
    let showEditUserModal = $state(false);

    function deleteUser(user = userFocus) {
        let confirmation = confirm(
            "Are you sure you want to delete this user?",
        );
        if (!confirmation) return;
        userFocus = user;
        console.log("Delete:");
        console.log(userFocus);
    }

    function toggleNewUserModal(user = userFocus) {
        userFocus = user;
        showNewUserModal = !showNewUserModal;
    }

    function toggleEditUserModal(user = userFocus) {
        userFocus = user;
        showEditUserModal = !showEditUserModal;
    }

    function createUser(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        console.log("Create User");
        console.log(data);
        toggleNewUserModal();
    }

    function saveUser(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        console.log("Save User");
        console.log(data);
        toggleEditUserModal();
    }
</script>

<div class="main-content">
    <div class="page">
        <div class="page-header">
            <h2>Users:</h2>
            <Button text={"New User"} clickFunction={toggleNewUserModal} />
        </div>
        <Table {usersData} onEdit={toggleEditUserModal} onDelete={deleteUser} />
    </div>
</div>
{#if showNewUserModal}
    <NewModal doClose={toggleNewUserModal} doSubmit={createUser} />
{/if}
{#if showEditUserModal}
    <EditModal
        doClose={toggleEditUserModal}
        doSubmit={saveUser}
        user={userFocus}
    />
{/if}

<style>
    @import "$lib/styles/button.css";
    @import "$lib/styles/admin.css";
</style>
