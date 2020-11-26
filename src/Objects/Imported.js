import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export default class Imported {
    constructor(resourceURL) {
        // Instantiate a loader
        this.loader = new GLTFLoader();

        // Load a glTF resource
        this.loader.load(
            // resource URL
            resourceURL,
            // called when the resource is loaded
            (gltf) => {
                scene.add(gltf.scene);
            },
            // called while loading is progressing
            (xhr) => {
                console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            // called when loading has errors
            (error) => {
                console.log('An error happened');
            },
        );
    }
}