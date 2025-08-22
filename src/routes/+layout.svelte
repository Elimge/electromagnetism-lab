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
<div class="app-container">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
	}
	main {
		flex-grow:  1;
		position: relative;
		overflow: hidden;
		min-height: 0;
		/* Header - high 
		height: calc(100vh - 60px);
		width: 100vw;
		position: relative;
		overflow: hidden; */
	}
</style>
