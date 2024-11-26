<script>
    // Export form
    let { form } = $props(); // Is automatically populated by SvelteKit
    
    // Import the "enhance" function from the "form" module.
    import { enhance } from '$app/forms';

    // Import logo from assets
    import logo from "$lib/assets/logo.ico";
</script>

<div class="login-page">
    <div class="login-container">
        
        <img class="login-icon" src={logo} alt="Logo" />
        <h1 class="login-title">Kunsten</h1>

        <form method="post" action="?/resetPassword" use:enhance>
            <input type="email" name="email" placeholder="Email" required />

            {#if form?.success}
                <p>Reset password link sent if account exists.</p>
            {/if}

            {#if form?.error}
                <p class="login-error">{form.error}</p>
            {/if}

            <button type="submit" class="login-submit">Reset Password</button>
        </form>
            
        <a href="/login" class="login-forgot">Back to Log In</a>
    </div>
</div>

<style>
    @import "$lib/styles/login.css";
</style>
