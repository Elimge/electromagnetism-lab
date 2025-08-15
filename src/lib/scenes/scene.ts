// src/lib/scenes/scene.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { calculateBField } from "$lib/physics/biotSavart";

// Define an interface for the state of the scene.
interface SceneState {
    current: number;
}

export function createScene(canvas: HTMLCanvasElement) {
    // The Scene
    // Main container of objects, lights and cameras
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); // Background dark grey
    // The Camera
    // Define visible scene parts. 
    const camera = new THREE.PerspectiveCamera(
        75, // field of view
        window.innerWidth / window.innerHeight, // aspect ratio
        0.1, // near clipping plane
        1000 // far clipping plane
    )
    camera.position.set(3, 2, 5); // Initial camera position

    // The renderer
    // Draw the scene since the POV canvas camera
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas, 
        antialias: true // Suaviza los bordes de los objetos
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Mejora la calidad en pantallas de alta densidad

    // Camera controls 
    // Allow rotate, zoom or move the camera by the user
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 

    // Define the current across the cable
    const sceneState: SceneState = {
        current: 5 // Amperes
    }
    

    // The Objects (Geometry + Material = Mesh)
    // To create a visible object, need a 'geometry' (the shape) and a 'material' (color or texture).
    // 1. The infinite cable
    const wireGeometry = new THREE.CylinderGeometry(0.05, 0.05, 20, 16); // radius, radius, high, segments
    const wireMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.5, roughness: 0.5 }) // *
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);; // The 'Mesh' is the final object 
    scene.add(wire); 
    
    // 2. The measuring point (a little sphere)
    const pointGeometry = new THREE.SphereGeometry(0.15, 16, 16); //radius, segments, segments 
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const measurementPoint = new THREE.Mesh(pointGeometry, pointMaterial);
    measurementPoint.position.set(2, 0, 0) //two units of the axis x of the cable
    scene.add(measurementPoint);

    // 3. The Magnetic Field Vector (an arrow)
    // Now the 'ArrowHelper' represents the B Field. Initialize pointing up.
    const origin = new THREE.Vector3(0, 0, 0); // The initial point of the arrow
    const length = 1; // Initial length
    const hexColor = 0xff0000; // Red
    const bFieldVector = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, length, hexColor);
    measurementPoint.add(bFieldVector); // The arrow is sphere's kid

    //Ligths to gooklooking
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); 
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation Loop 
    const animate = () => {
        requestAnimationFrame(animate); // Call 'animate' in the next frame 
        controls.update(); // Update the controlls in each photograme for damping works.

        // At each frame, we calculate the magnetic field at the current position of the sphere.
        const bField = calculateBField(sceneState.current, measurementPoint.position);

        // The actual magnetic field values (Teslas) are very small.
        // We scale them by a large factor so the arrow is visible.
        const visualizationScale = 5e5;
        const bFieldMagnitude = bField.length() * visualizationScale;
        const bFieldDirection = bField.normalize();

        //Update the arrow's direction and length.
        bFieldVector.setLength(bFieldMagnitude);
        bFieldVector.setDirection(bFieldDirection);
        
        
        // Render the scene 
        renderer.render(scene, camera);
    };
    
    animate();

    // Handle the redimension of the window 
    window.addEventListener("resize", () => {
        // Update the camera dimensions
        camera.aspect = window.innerWidth / window.innerHeight; 
        camera.updateProjectionMatrix();

        // Update the render dimensions
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    return {
        update: (newState: Partial<SceneState>) => {
            // Object.assign allows us to merge the new state with the existing one.
            Object.assign(sceneState, newState);
        }
    };
}
