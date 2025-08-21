<!-- src/lib/components/shared/ThemeToggle.svelte -->
 <script lang="ts">
    import { theme } from "$lib/stores/themeStore.ts";

    function toggleTheme() {
        // Svelte's '$store' syntax allows modify the store directly
        $theme = $theme == "light" ? "dark" : "light";
    }
 </script>

 <button on:click={toggleTheme} aria-label="Cambiar tema">
    {#if $theme === "light"}
        <span>🌙</span>
    {:else}
        <span>☀️</span>
    {/if}
 </button>

 <style> 
    button {
        background: none;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        transition: background-color 0.2s; 
    }
    button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
 </style>