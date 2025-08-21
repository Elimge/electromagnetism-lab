<!-- src/lib/components/shared/LanguageSelector.svelte -->
 <script lang="ts">
    import { locale } from "svelte-i18n";

 </script>

 <div class="language-selector">
    <button class:active={$locale === "es"} on:click={() => ($locale = "es")}>ES</button>
    <button class:active={$locale === "en"} on:click={() => ($locale = "en")}>EN</button>
 </div>

 <style>
    .language-selector {
        display: flex;
        border: 1px solid var(--border-color);
        border-radius: 20px;
        overflow: hidden;
    }
    button {
        padding: 6px 12px;
        border: none;
        background-color: transparent;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s;
    }
    button:hover {
        background-color: rgba(128, 128, 128, 0.2);
    }
    button.active {
        background-color: var(--text-primary);
        color: var(--bg-primary);
        font-weight: bold;
    }
 </style>