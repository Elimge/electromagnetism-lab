// src/lib/physics/biotSavart.test.ts

// Imports for testing framework and necessary modules
import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { calculateWireBField } from './biotSavart';

/**
 * Unit tests for the Biot-Savart physics calculations.
 */
describe('calculateWireBField', () => {
    // Test case: Calculate B field for a positive current at a specific point
    it('should calculate the correct B field for a positive current at a point on the x-axis', () => {
		// --- ARRANGE ---
		// Set up test parameters
		const current = 10; // 10 Amperes
		const measurementPosition = new THREE.Vector3(2, 0, 0); // 2 meters along the x-axis

        // Define the expected result based on manual calculations:
		// B = (μ₀ * I) / (2 * π * r) = (2e-7 * 10) / 2 = 1e-6 T
		// Direction (z, 0, -x) -> (0, 0, -2) -> normalized -> (0, 0, -1)
		const expectedMagnitude = 1e-6;
		const expectedDirection = new THREE.Vector3(0, 0, -1);
		const expectedBField = expectedDirection.multiplyScalar(expectedMagnitude);

		// --- ACT ---
		// Call the function under test
		const result = calculateWireBField(current, measurementPosition);

		// --- ASSERT ---
		// Verify the result matches expected values
		expect(result.x).toBeCloseTo(expectedBField.x);
		expect(result.y).toBeCloseTo(expectedBField.y);
		expect(result.z).toBeCloseTo(expectedBField.z);
	});

    // Test case: Check an "edge case" where the measurement point is on the wire
    it('should return a zero vector when the measurement point is on the wire', () => {
		// --- ARRANGE ---
		const current = 10;
		const measurementPosition = new THREE.Vector3(0, 0, 0); // At the origin, on the wire
		const expectedBField = new THREE.Vector3(0, 0, 0);

		// --- ACT ---
		const result = calculateWireBField(current, measurementPosition);

		// --- ASSERT ---
		expect(result).toEqual(expectedBField);
	});

    // Test case: Calculate B field for a negative current at a specific point
    it('should calculate an inverted B field for a negative current', () => {
		// --- ARRANGE ---
		const current = -10; // Corriente negativa
		const measurementPosition = new THREE.Vector3(2, 0, 0);

		// The expected result is the same magnitude but opposite direction
		const expectedMagnitude = 1e-6;
		const expectedDirection = new THREE.Vector3(0, 0, 1); // El vector (0, 0, -1) invertido
		const expectedBField = expectedDirection.multiplyScalar(expectedMagnitude);

		// --- ACT ---
		const result = calculateWireBField(current, measurementPosition);

		// --- ASSERT ---
		expect(result.x).toBeCloseTo(expectedBField.x);
		expect(result.y).toBeCloseTo(expectedBField.y);
		expect(result.z).toBeCloseTo(expectedBField.z);
	});

    // Test case: Calculate B field at a point along the z-axis
    it('should calculate the correct B field for a point on the z-axis', () => {
		// --- ARRANGE ---
		const current = 10;
		const measurementPosition = new THREE.Vector3(0, 0, 2); // Point on the z-axis

        // Expected result based on manual calculations:
		// B = (2e-7 * 10) / 2 = 1e-6 T
		// Direction (z, 0, -x) -> (2, 0, 0) -> normalized -> (1, 0, 0)
		const expectedMagnitude = 1e-6;
		const expectedDirection = new THREE.Vector3(1, 0, 0);
		const expectedBField = expectedDirection.multiplyScalar(expectedMagnitude);

		// --- ACT ---
		const result = calculateWireBField(current, measurementPosition);

		// --- ASSERT ---
		expect(result.x).toBeCloseTo(expectedBField.x);
		expect(result.y).toBeCloseTo(expectedBField.y);
		expect(result.z).toBeCloseTo(expectedBField.z);
	});

    // Future tests
});