<script>
    let { form, data } = $props();
       
    import logo from "$lib/assets/logo.ico";

    let showSend = $state(false);

    function sendData(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const email = data.get("email").toString();
        if (email === "") {
            return;
        }
        showSend = true;
        console.log("Sending data");
        console.log(email);
    }
</script>

<div class="login-page">
    <div class="login-container">
        
        <img class="login-icon" src={logo} alt="Logo" />
        <h1 class="login-title">Kunsten</h1>
        <form method="post" onsubmit={sendData}>
            <input type="email" name="email" placeholder="Email" required />

            {#if showSend}
                <p>
                    Reset password link sent if account exist.
                </p>
            {/if}

            <button type="submit" class="login-submit">Reset Password</button>
            
            <a href="/login" class="login-forgot">Back to Log In</a>
        </form>
    </div>
</div>

<style>
    @import "$lib/styles/login.css";
</style>
