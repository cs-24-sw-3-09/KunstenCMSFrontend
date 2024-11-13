<script>
</script>

<svelte:head>
    <script
        src="https://kit.fontawesome.com/86cff0f4ad.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<link rel="stylesheet" href="../css/admin.css" />
<link rel="stylesheet" href="../css/adminModal.css" />
<link rel="stylesheet" href="../css/general.css" />
<link rel="stylesheet" href="../css/tooltip.css" />

<div class="grid-container">
    <div class="main-content">
        <div class="admin-page">
            <div class="admin-page-header">
                <h2>Users:</h2>
                <button id="admin-page-new-user-btn">New User</button>
            </div>
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
                </tbody>
            </table>
        </div>
    </div>
    <div class="new-user-modal">
        <div class="new-user-modal-content">
            <!--  <div
                class="new-user-modal-close"
                onclick="closeNewUserModal(event)"
            > -->
            <i class="fa-solid fa-x"></i>
        </div>
        <div class="new-user-modal-header"></div>
        <form action="#" id="new-user-modal-form">
            <div class="new-user-modal-firstname">
                <label for="firstname">First Name</label>
                <input type="text" id="firstname" name="firstname" required />
            </div>
            <div class="new-user-modal-lastname">
                <label for="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" required />
            </div>
            <div class="new-user-modal-email">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div class="new-user-modal-notifications">
                <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                />
                <label for="notifications">Receive Notifications</label>
            </div>
            <div class="new-user-modal-roles">
                <p>Roles:</p>
                <div class="new-user-modal-role-admin">
                    <input type="checkbox" id="role-admin" name="role-admin" />
                    <label for="role-admin">Admin</label>
                </div>
                <div class="new-user-modal-role-admin">
                    <input
                        type="checkbox"
                        id="role-mediaplanner"
                        name="role-mediaplanner"
                    />
                    <label for="role-mediaplanner">Media Planner</label>
                </div>
            </div>
            <div class="new-user-modal-buttons">
                <!-- <button
                    class="new-user-modal-button new-user-modal-button-cancel"
                    onclick="closeNewUserModal(event)"
                >
                    Cancel
                </button> -->
                <button
                    class="new-user-modal-button new-user-modal-button-create"
                ></button>
            </div>
        </form>
    </div>
</div>


<style>
    import "$lib/styles/tooltip.css";
    import "$lib/styles/page.css";
    import "$lib/styles/admin.css";
    import "$lib/styles/adminModal.css";
</style>
