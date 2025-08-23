// src/lib/stores/simulationStore.ts

/**
 * This module manages the global state for the currently active simulation scenario.
 */
import { writable } from 'svelte/store';

/**
 * Defines the possible string literal identifiers for each simulation scenario.
 * These values correspond to the logic used in `scene.ts`.
 */
export type SimulationType = 'infinite_wire' | 'circular_loop' | 'solenoid';

/**
 * A writable Svelte store that holds the identifier of the currently active simulation.
 *
 * Components like `ScenarioSelector` write to this store, and the main `scene.ts`
 * subscribes to it to determine which 3D model and physics formula to use.
 *
 * @default 'infinite_wire'
 */
export const activeSimulation = writable<SimulationType>('infinite_wire');
