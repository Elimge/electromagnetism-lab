// src/lib/scenes/scene.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { calculateWireBField, calculateLoopBField, calculateSolenoidBField } from "$lib/physics/biotSavart";
import { activeSimulation, type SimulationType } from "$lib/stores/simulationStore";

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

    // Save the dimensions of the models 
    const LOOP_RADIUS = 2; 
    const SOLENOID_HEIGHT = 4;
    const SOLENOID_TURNS = 20; 

    // The Objects (Geometry + Material = Mesh)
    // To create a visible object, need a 'geometry' (the shape) and a 'material' (color or texture).
    // --- Model 1: Infinite cable ---
    // 1. The infinite cable
    const wireGeometry = new THREE.CylinderGeometry(0.05, 0.05, 20, 16); // radius, radius, high, segments
    const wireMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.5, roughness: 0.5 }) // *
    const wire = new THREE.Mesh(wireGeometry, wireMaterial); // The 'Mesh' is the final object 
    scene.add(wire); 
    
    // --- Model 2: Circular loop ---
    const loopGeometry = new THREE.TorusGeometry(LOOP_RADIUS, 0.05, 16, 64); // toro radius, tube radius 
    const loop = new THREE.Mesh(loopGeometry, wireMaterial); 
    loop.rotation.x = Math.PI / 2; // Rotate to be in XZ plane 
    scene.add(loop); 

    // --- Model 3: Solenoid ---
    const solenoidPoints = []; 
    for (let i = 0; i <= SOLENOID_TURNS *2; i += 0.1) {
        const y = (i/ (SOLENOID_TURNS * 2) -0.5) * SOLENOID_HEIGHT;
        const x = Math.cos(i * Math.PI) * 1;
        const z = Math.sin(i * Math.PI) * 1;
        solenoidPoints.push(new THREE.Vector3(x, y, z));
    } 
    const solenoidCurve = new THREE.CatmullRomCurve3(solenoidPoints);
    const solenoidGeometry = new THREE.TubeGeometry(solenoidCurve, 256, 0.05, 16, false);
    const solenoid = new THREE.Mesh(solenoidGeometry, wireMaterial); 
    scene.add(solenoid);


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

    // Suscribe to the store to update the visibility 
    let currentSimulation: string; 
    const unsubscribe = activeSimulation.subscribe((simulation) => {
        currentSimulation = simulation; // Save the actual status 
        wire.visible = simulation === "infinite_wire";
        loop.visible = simulation === "circular_loop";
        solenoid.visible = simulation === "solenoid";
        // 
        measurementPoint.visible = true;

        // Re ubicate the sphere at initial point 
        if (simulation === "infinite_wire") {
            measurementPoint.position.set(2, 0, 0); 
        } else {
            measurementPoint.position.set(0, 0, 0);
        }
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let draggedObject: THREE.Object3D | null = null; 
    const draggableObjects = [measurementPoint];

    // A invisible plane at y=0 on which it will drag the sphere.
    const dragPlaneHorizontal = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const dragPlaneVertical = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    function onPointerDown(event: PointerEvent) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1; 
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(draggableObjects);
        
        if (intersects.length > 0) {
            draggedObject = intersects[0].object;
            controls.enabled = false; // Deactive the camera to don't move everything at the same time 
        }
    }
    
    function onPointerMove(event: PointerEvent) {
        if (draggedObject) {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);

            const intersectionPoint = new THREE.Vector3(); 
            
            if (currentSimulation === "infinite_wire") {
                raycaster.ray.intersectPlane(dragPlaneHorizontal, intersectionPoint); 
                draggedObject.position.set(intersectionPoint.x, 0, intersectionPoint.z); 
            } else {
                raycaster.ray.intersectPlane(dragPlaneVertical, intersectionPoint); 
                draggedObject.position.set(0, intersectionPoint.y, 0); 
            }
        }
    }

    function onPointerUp() {
        draggedObject = null; 
        controls.enabled = true; // Reactivate the camera 
    }

    // Register the event listeners 
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Animation Loop 
    const animate = () => {
        requestAnimationFrame(animate); // Call 'animate' in the next frame 
        controls.update(); // Update the controlls in each photograme for damping works.

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

        // The physics only updates if the object is visible 
        // if (measurementPoint.visible) {
        //     // At each frame, we calculate the magnetic field at the current position of the sphere.
        //     const bField = calculateWireBField(sceneState.current, measurementPoint.position);
    
        //     // The actual magnetic field values (Teslas) are very small.
        //     // We scale them by a large factor so the arrow is visible.
        //     const visualizationScale = 5e5;
        //     const bFieldMagnitude = bField.length() * visualizationScale;
        //     const bFieldDirection = bField.normalize();
    
        //     //Update the arrow's direction and length.
        //     bFieldVector.setLength(bFieldMagnitude);
        //     bFieldVector.setDirection(bFieldDirection);
        // }
        
        const visualizationScale = 5e5; 
        const bFieldMagnitude = bField.length() * visualizationScale;
        const bFieldDirection = bField.normalize();
        bFieldVector.setDirection(bFieldDirection);
        bFieldVector.setLength(bFieldMagnitude, 0.2, 0.1); 
        
        // Render the scene 
        renderer.render(scene, camera);
    };
    
    animate();

    // Handle the redimension of the window 
    const handleResize = () => {
        // Update the camera dimensions
        camera.aspect = window.innerWidth / window.innerHeight; 
        camera.updateProjectionMatrix();

        // Update the render dimensions
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    return {
        update: (newState: Partial<SceneState>) => {
            // Object.assign allows us to merge the new state with the existing one.
            Object.assign(sceneState, newState);
        },

        // Return a function to clean the event listeners 
        destroy: () => {
            unsubscribe(); 
            window.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("resize", () => {}); // Remove the resize listener 
        }
    };
}
