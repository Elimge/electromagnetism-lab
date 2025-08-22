// src/lib/scenes/scene.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { calculateWireBField, calculateLoopBField, calculateSolenoidBField } from "$lib/physics/biotSavart";
import { activeSimulation } from "$lib/stores/simulationStore";

/**
 * Interface for the mutable state of the scene, which can be updated from outside.
 */
interface SceneState {
    current: number;
}

/**
 * Initializes and manages the entire Three.js scene, including objects, controls, and rendering.
 * @param canvas The HTMLCanvasElement to render the scene into.
 * @returns An object with an `update` method to change the scene's state and a `destroy` method for cleanup.
 */
export function createScene(canvas: HTMLCanvasElement) {
    // --- Core Three.js Components ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); 
   
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(3, 2, 5); // Initial camera position

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas, 
        antialias: true 
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Provides a smoother, more realistic camera movement.
    controls.target.set(0, -0.5, 0); // Aims camera slightly downwards.

    // --- Scene State & Constants ---
    const sceneState: SceneState = {
        current: 5 // Default current in Amperes
    }

    // Geometric constants for the models. Units are in meters. 
    const LOOP_RADIUS = 2; 
    const SOLENOID_HEIGHT = 4;
    const SOLENOID_TURNS = 20; 

    // --- 3D Models ---
    const wireMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xb87333, // Copper-like color
        metalness: 0.7, 
        roughness: 0.3 
    }) 

    // 1. Infinite Straight Wire Model
    const wireGeometry = new THREE.CylinderGeometry(0.05, 0.05, 20, 16); // radius, radius, high, segments
    const wire = new THREE.Mesh(wireGeometry, wireMaterial); 
    scene.add(wire); 
    
    // 2. Circular Loop Model
    const loopGeometry = new THREE.TorusGeometry(LOOP_RADIUS, 0.05, 16, 64); // toro radius, tube radius 
    const loop = new THREE.Mesh(loopGeometry, wireMaterial); 
    loop.rotation.x = Math.PI / 2; // Rotate to align with the XZ plane.
    scene.add(loop); 

    // 3. Solenoid Model
    const solenoidPoints = []; 
    // Create a helical path for the solenoid's tube geometry.
    for (let i = 0; i <= SOLENOID_TURNS *2; i += 0.1) {
        const y = (i/ (SOLENOID_TURNS * 2) -0.5) * SOLENOID_HEIGHT;
        const x = Math.cos(i * Math.PI) * 1; // Radius of 1 meter
        const z = Math.sin(i * Math.PI) * 1;
        solenoidPoints.push(new THREE.Vector3(x, y, z));
    } 
    const solenoidCurve = new THREE.CatmullRomCurve3(solenoidPoints);
    const solenoidGeometry = new THREE.TubeGeometry(solenoidCurve, 256, 0.05, 16, false);
    const solenoid = new THREE.Mesh(solenoidGeometry, wireMaterial); 
    scene.add(solenoid);

    // --- Visualization Helpers ---

    // 1. The movable measurement point (a white sphere)
    const pointGeometry = new THREE.SphereGeometry(0.15, 16, 16);  
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const measurementPoint = new THREE.Mesh(pointGeometry, pointMaterial);
    measurementPoint.position.set(2, 0, 0) 
    scene.add(measurementPoint);

    // 2. The magnetic field vector (a custom red arrow).
    const arrowGroup = new THREE.Group(); 
    const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // The arrow is composed of a cylinder (shaft) and a cone (head).
    const shaftGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 8); // Radius, radius, high, segments
    const shaft = new THREE.Mesh(shaftGeometry, arrowMaterial); 
    shaft.position.y = 0.5; // Position relative to the group's center.
    const headGeometry = new THREE.ConeGeometry(0.08, 0.2, 8); //Radius, high, segments
    const head = new THREE.Mesh(headGeometry, arrowMaterial); 
    head.position.y = 1; 

    arrowGroup.add(shaft);
    arrowGroup.add(head);
    scene.add(arrowGroup); 

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); 
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

	// --- Svelte Store Integration --- 
    let currentSimulation: string; 
    const unsubscribe = activeSimulation.subscribe((simulation) => {
        currentSimulation = simulation; 
        // Toggle visibility of the main models based on the selected scenario.
        wire.visible = simulation === "infinite_wire";
        loop.visible = simulation === "circular_loop";
        solenoid.visible = simulation === "solenoid";
        // 
        measurementPoint.visible = true;

        // Reset the measurement point to a sensible default position for each scenario. 
        if (simulation === "infinite_wire") {
            measurementPoint.position.set(2, 0, 0); 
        } else {
            // For loop and solenoid, the most interesting area is along the central axis.
            measurementPoint.position.set(0, 0, 0);
        }
    });

    // --- Interactivity (Drag & Drop) ---
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let draggedObject: THREE.Object3D | null = null; 
    const draggableObjects = [measurementPoint];

    // Define invisible planes to constrain the dragging movement.
    const dragPlaneHorizontal = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const dragPlaneVertical = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    function onPointerDown(event: PointerEvent) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObjects(draggableObjects);

        if (intersects.length > 0) {
            draggedObject = intersects[0].object;
            controls.enabled = false; // Disable camera controls while dragging an object 
        } 
    }
    
    function onPointerMove(event: PointerEvent) {
        if (draggedObject) {
            const rect = canvas.getBoundingClientRect();
            pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(pointer, camera);

            const intersectionPoint = new THREE.Vector3(); 
            
            // Constrain movement based on the current simulation scenario.
            if (currentSimulation === "infinite_wire") {
                // For the wire, allow free movement on the horizontal plane.
                raycaster.ray.intersectPlane(dragPlaneHorizontal, intersectionPoint); 
                draggedObject.position.set(intersectionPoint.x, 0, intersectionPoint.z); 
            } else {
                // For the loop and solenoid, restrict movement to the vertical axis.
                raycaster.ray.intersectPlane(dragPlaneVertical, intersectionPoint); 
                draggedObject.position.set(0, intersectionPoint.y, 0); 
            }
        }
    }

    function onPointerUp() {
        draggedObject = null; 
        controls.enabled = true; // Re-enable camera controls.
    }

    // --- Animation Loop --- 
    const animate = () => {
        requestAnimationFrame(animate); 
        controls.update(); // Required if enableDamping is true

        // 1. Calculate the magnetic field based on the current scenario.
        let bField = new THREE.Vector3(0, 0, 0); 
        switch (currentSimulation) {
            case "infinite_wire" :
                bField = calculateWireBField(sceneState.current, measurementPoint.position);
                break; 
            case "circular_loop":
                bField = calculateLoopBField(sceneState.current, LOOP_RADIUS, measurementPoint.position);
                break;
            case "solenoid":
                bField = calculateSolenoidBField(sceneState.current, SOLENOID_TURNS, SOLENOID_HEIGHT, measurementPoint.position); 
                break; 
        }
        
        // 2. Update the visualization arrow.
        arrowGroup.position.copy(measurementPoint.position);

        // The raw magnetic field values (in Teslas) are extremely small, so we scale them up for visibility.
        const visualizationScale = 5e5; 
        const bFieldMagnitude = bField.length() * visualizationScale;
        if (bFieldMagnitude < 0.001) {
            arrowGroup.visible = false; // Hide arrow if the field is negligible.
        } else {
            arrowGroup.visible = true;
            // Clamp the arrow's length to a max value to prevent it from becoming excessively long.
            const arrowLength = Math.min(bFieldMagnitude, 5); 
            shaft.scale.y = arrowLength; 
            shaft.position.y = arrowLength / 2; 
            head.position.y = arrowLength;

            // Orient the arrow to point in the direction of the magnetic field.
            const bFieldDirection = bField.normalize();
            // The default arrow points along +Y, so we find the rotation from +Y to the field direction.
            arrowGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), bFieldDirection);
        }

        // 3. Render the final scene.
        renderer.render(scene, camera);
    };
    
    animate();

    // --- Lifecycle Management ---
    const handleResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Register event listeners.
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", handleResize);

    // Return methods to control the scene from outside.
    return {
        /**
		 * Updates the internal state of the scene (e.g., the current).
		 * @param newState A partial state object.
		 */
        update: (newState: Partial<SceneState>) => {
            // Object.assign allows us to merge the new state with the existing one.
            Object.assign(sceneState, newState);
        },

        /**
		 * Cleans up resources and event listeners to prevent memory leaks when the component is destroyed.
		 */
        destroy: () => {
            unsubscribe(); 
            window.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("resize", handleResize); // Remove the resize listener 
        }
    };
}
