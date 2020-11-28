import {
  WebGLRenderer, Scene, Color, FogExp2, AxesHelper, PerspectiveCamera, HemisphereLight,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class SceneManager {
  constructor(canvas) {
    // Init Render
    this.renderer = new WebGLRenderer({ antialias: true, canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.scene.background = new Color(0xcccccc);
    this.scene.fog = new FogExp2(0xcccccc, 0.002);
    this.scene.add(new AxesHelper(500));

    this.camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(400, 200, 0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    this.controls.screenSpacePanning = false;

    this.controls.minDistance = 50;
    this.controls.maxDistance = 500;

    this.controls.maxPolarAngle = (2 * Math.PI) / 3; // Limit to horizon

    // Instantiate a loader
    this.loader = new GLTFLoader();

    // Load a glTF resource
    this.loader.load(
      // resource URL
      '../temple.gltf',
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

    // lights
    this.hemilight = new HemisphereLight(0xffeeb1, 0x080820, 4);
    this.scene.add(this.hemilight);

    this.update = () => {
      requestAnimationFrame(this.update);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
  }
}
