<script>
    let { form, data } = $props();
    import { userStore } from "$lib/auth.js";
    
    import logo from "$lib/assets/logo.ico";

    let showError = $state(false);

    // Function for sending email and password to server
    /* async function sendLoginData() {
        try {
            const response = fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: new URLSearchParams({ password, email }),
            });

            if (!response.ok) {
                throw new Error("Error in Network response");
            }

            // TODO: assign tokens to paraemter.

            const data = await response.json();
            console.log("servers respons:", data);
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
        }
    } */

    function sendData() {
        console.log("Sending data");
        console.log(email, password);
        // TODO: Send data to server
    }

    //TODO: Make this function when token are made in backend..
    function tokenCheck(loginToken, reloadToken) {
        if (loginToken);
    }

    function toggleError() {
        showError = !showError;
    }
</script>

<div class="login-page">
    <div class="login-container">
        
        <img class="login-icon" src={logo} alt="Logo" />
        <h1 class="login-title">Kunsten</h1>
        <form method="post">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            
            {#if toggleError}
                <p id="login-error" class="error">
                    Incorrect email or password.
                </p>
            {/if}

            <button onclick={sendData} type="submit" class="login-submit">Log In</button>
            
            <a href="/html/forgot.html" class="login-forgot">Forgot password?</a>
        </form>
    </div>
    <form method="POST">
        <button>log in</button>
    </form>
</div>


<style>
    @import "$lib/styles/login.css";
</style>
