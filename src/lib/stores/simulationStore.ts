// src/lib/stores/simulationStore.ts

import { writable } from "svelte/store"; 

// Define the posibles types of simulation that the app can has 
export type SimulationType = "infinite_wire" | "circular_loop" | "solenoid"; 

// Create the store. 'writable' the value can change since everywhere 
// Initialize with the value = 'infinite_wire', who will be the default simulation 
export const activeSimulation = writable<SimulationType>("infinite_wire");
