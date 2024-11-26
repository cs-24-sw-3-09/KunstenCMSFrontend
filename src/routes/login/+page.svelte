<script>
    let { form, data } = $props();
       
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

    function sendData(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const email = data.get("email").toString();
        const password = data.get("password").toString();

        if (email === "" | password === "") {
            return;
        }

        console.log("Sending data");
        console.log(email, password);
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
        
        <img class="login-icon" src={logo} alt="Logo" onsubmit={sendData} />
        <h1 class="login-title">Kunsten</h1>
        <form method="post">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            
            {#if showError}
                <p id="login-error" class="error">
                    Incorrect email or password.
                </p>
            {/if}

            <button type="submit" class="login-submit">Log In</button>
            
            <a href="/recover" class="login-forgot">Forgot password?</a>
        </form>
    </div>
</div>


<style>
    @import "$lib/styles/login.css";
</style>
