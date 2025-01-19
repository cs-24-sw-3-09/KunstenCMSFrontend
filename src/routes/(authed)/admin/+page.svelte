<script>
    let { data, form } = $props(); // Is automatically populated by SvelteKit

    import Button from "$lib/components/button.svelte";
    import Table from "$lib/components/admin/table.svelte";
    import EditModal from "$lib/components/admin/editmodal.svelte";
    import NewModal from "$lib/components/admin/newmodal.svelte";
    import SavedPopup from "$lib/components/savedpopup.svelte";

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

    let popup;

    function saveData(success) {
    if (success) {
    popup.show("Your changes have been saved!", "success");
    } else {
    popup.show("Failed to save changes!", "error");
    }
    }
</script>

<div class="main-content">
    <div class="admin-page">
        <div class="page-header">
            <h2>Users:</h2>
            <Button text={"New User"} clickFunction={toggleNewUserModal} />
        </div>
        <Table {usersData} onEdit={toggleEditUserModal} updateUsersData={updateUsersData} {form} saveData={saveData} />
    </div>
</div>
{#if showNewUserModal}
    <NewModal doClose={toggleNewUserModal} updateUsersData={updateUsersData} saveData={saveData}/>
{/if}
{#if showEditUserModal}
    <EditModal doClose={toggleEditUserModal} user={userFocus} updateUsersData={updateUsersData} saveData={saveData} />
{/if}

<SavedPopup bind:this={popup} />

<style>
    @import "$lib/styles/button.css";
    @import "$lib/styles/admin.css";
</style>
