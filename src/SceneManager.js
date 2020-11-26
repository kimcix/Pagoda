import * as THREE from 'three/build/three.module';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class SceneManager {
  constructor(canvas) {
    // Init Render
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xcccccc);
    this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    this.scene.add(THREE.AxisHelper(500));

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(400, 200, 0);

    this.controls = new OrbitControls(camera, renderer.domElement);
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
        console.log('An error happened');
      },
    );
    // world
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshStandardMaterial({ color: 0x86a2cf });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    // lights
    this.hemilight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    this.scene.add(hemilight);
  }

  onWindowResize() {
    console.log(this);
  }

  update() {
    console.log(this);
  }
}
