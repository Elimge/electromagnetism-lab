<!-- src/routes/+page.svelte -->
<script lang="ts">
	/**
	 * The main page of the application, which hosts the interactive simulation.
	 * This component acts as the parent container for the simulation view and the controls panel,
	 * managing the state that connects them.
	 *
	 * @page /
	 */
	import SimulationView from '$lib/components/SimulationView.svelte';
	import ControlsPanel from '$lib/components/ControlsPanel.svelte';

	// --- State Management ---

	/**
	 * The state variable that holds the current value (in Amperes).
	 * It is initialized with a default value of 5 A.
	 * - It is passed down as a `prop` to the `SimulationView`.
	 * - It is updated by listening to the `currentchange` event from the `ControlsPanel`.
	 */
	let simulationCurrent = 5;

	/**
	 * Event handler that is called when the `ControlsPanel` dispatches a `currentchange` event.
	 * It updates the `simulationCurrent` state with the new value from the event detail.
	 * @param event The custom event containing the new current value.
	 */
	function handleCurrentChange(event: CustomEvent<{ value: number }>) {
		simulationCurrent = event.detail.value;
	}
</script>

<!-- The SimulationView component receives the current value as a prop. -->
<SimulationView current={simulationCurrent} />

<!-- The ControlsPanel component emits the `currentchange` event, which is handled here. -->
<ControlsPanel on:currentchange={handleCurrentChange} />
