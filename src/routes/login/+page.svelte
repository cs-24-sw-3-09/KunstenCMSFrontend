<script>
let password = $state("");
let email = $state("");

function loginVerification(email, password) {
    console.log(email, password);
    method: POST
}
</script>

<div class="login-page">
    <div class="login-container">
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
            <p id="login-error" hidden>Incorrect username or password.</p>
            <button
                onclick={loginVerification(email, password)}
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
