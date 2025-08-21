<!-- src/routes/+layout.svelte -->
<svelte:head>
	<title>Laboratorio de Electromagnetismo</title>
</svelte:head>

<script lang="ts">
	import Header from "$lib/components/shared/Header.svelte";
	import { theme } from "$lib/stores/themeStore.ts";
	import { browser } from "$app/environment";
	import "../app.css"; 

	$: if (browser) {
		document.body.setAttribute("data-theme", $theme);
	}
</script>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		/* Header - high */ 
		height: calc(100vh - 60px);
		width: 100vw;
		position: relative;
		overflow: hidden;
	}
</style>
