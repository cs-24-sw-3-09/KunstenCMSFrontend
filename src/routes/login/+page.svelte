<script>
    let password = $state("");
    let email = $state("");
    // svelte-ignore non_reactive_update
        let showError = false;

    // Function for sending email and password to server
    async function sendLoginData() {
        try {
            const response = fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: new URLSearchParams({password, email}),
            });

            if (!response.ok) {
                throw new Error("Error in Network response");
            }

            // TODO: assign tokens to paraemter.

            const data = await response.json();
            console.log("servers respons:", data);
        } catch(error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }
    //TODO: Make this function when token are made in backend..
    function tokenCheck(loginToken, reloadToken){
        if (loginToken);
    }

    function wrongPassword(){
        showError = true;
    }

</script>

<div class="login-page">
    <div class="login-container">
        <!-- svelte-ignore a11y_missing_attribute -->
        <img class="login-icon" src="../src/Images/logo.ico" />
        <h1 class="login-title">Kunsten</h1>
        <form id="login-form">
            <input
                bind:value={email}
                type="email"
                id="login-username"
                placeholder="Email"
                required
            />
            <input
                bind:value={password}
                type="password"
                id="login-password"
                placeholder="Password"
                required
            />

            <div>
                <p id="login-error" hidden={!showError}>Incorrect username or password.</p>
            </div>

            <button
                onclick={sendData}
                type="submit"
                id="login-submit"
                class="login-submit">Log In</button
            >
            <a href="/html/forgot.html" class="login-forgot">Forgot password?</a
            >
        </form>
    </div>
</div>

<style>
    @import "./page.css";
</style>
