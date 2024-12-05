<script>
    // Export form
    let { form } = $props(); // Is automatically populated by SvelteKit
    
    // Import the "enhance" function from the "form" module.
    import { enhance } from '$app/forms';

    // Import logo from assets
    import logo from "$lib/assets/logo.ico";

    // Quiry url params
    import { page } from '$app/stores';

    const token = $page.url.searchParams.get("token");
    const email = $page.url.searchParams.get("email");
</script>

<div class="login-page">
    <div class="login-container">
        
        <img class="login-icon" src={logo} alt="Logo" />
        <h1 class="login-title">Kunsten</h1>

        <form method="post" action="?/resetPassword" use:enhance>
            <input type="email" name="email" placeholder="Email" value={email} required hidden readonly />
            <input type="hidden" name="token" value="{token}" required readonly />
            <input type="password" name="password" placeholder="Password" required autocomplete="new-password" minlength="8"/>
            <input type="password" name="confpassword" placeholder="Confirm Password" required autocomplete="new-password" minlength="8" />

            {#if form?.success}
                <p>Sucess.</p>
            {/if}

            {#if form?.error}
                <p class="login-error">{form.message}</p>
            {/if}

            <button type="submit" class="login-submit">Reset Password</button>
        </form>
            
        <a href="/login" class="login-forgot">Back to Log In</a>
    </div>
</div>

<style>
    @import "$lib/styles/login.css";
</style>
