import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import 'three/examples/jsm/libs/dat.gui.module';
export default class Entity {
  // Loads a model as Entity
  constructor(path, scene) {
    this.loader = new GLTFLoader();

    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/examples/js/libs/draco/');
    this.loader.setDRACOLoader(this.dracoLoader);

    // Load a glTF resource
    this.loader.load(
      // resource URL
      path,
      // called when the resource is loaded
      (gltf) => {
        scene.add(gltf.scene);
      },
    );
  }
}
