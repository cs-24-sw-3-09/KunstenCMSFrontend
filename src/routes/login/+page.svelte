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
        
        <img class="login-icon" src={logo} alt="Logo" onsubmit={sendData} />
        <h1 class="login-title">Kunsten</h1>

        <form method="post" action="?/login" use:enhance>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />

            {#if form?.error}
                <p class="login-error">{form?.message}</p>
            {/if}

            <button type="submit" class="login-submit">Log In</button>
        </form>
            
        <a href="/forgot" class="login-forgot">Forgot password?</a>
    </div>
</div>


<style>
    @import "$lib/styles/login.css";
</style>
