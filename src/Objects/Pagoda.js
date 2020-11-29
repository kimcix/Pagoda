import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Pagoda {
  // Load 
  constructor(path) {
    // Instantiate a loader
    this.loader = new GLTFLoader();

    // Load a glTF resource
    this.loader.load(
      // resource URL
      path,
      // called when the resource is loaded
      (gltf) => {
        this.scene.add(gltf.scene);
        /*
              gltf.animations; // Array<THREE.AnimationClip>
              gltf.scene; // THREE.Group
              gltf.scenes; // Array<THREE.Group>
              gltf.cameras; // Array<THREE.Camera>
              gltf.asset; // Object
              */
      },
      // called while loading is progressing
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      // called when loading has errors
      (error) => {
        console.log(`Error: ${error}`);
      },
    );
  }
}
