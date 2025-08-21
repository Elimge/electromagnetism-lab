<!-- src/lib/components/shared/Header.svelte -->
 <script lang="ts">
    import ThemeToggle from "./ThemeToggle.svelte";
 </script>

 <header>
    <h1>Laboratorio Virtual de Electromagnetismo</h1>
    <div class="controls">
        <ThemeToggle />

    </div>
 </header>

 <style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
        background-color: var(--header-bg);
        color: var(--header-text);
        height: 60px;
        border-bottom: 1px solid var(--header-border);
    }
    h1 {
        font-size: 1.2rem;
        font-weight: 500;
    }
    .controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
 </style>

