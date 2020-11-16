import * as THREE from 'three/build/three.module';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function SceneManger(canvas) {
  // Init renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);
  scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
  scene.add(THREE.AxisHelper(500));

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(400, 200, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 50;
  controls.maxDistance = 500;

  controls.maxPolarAngle = (2 * Math.PI) / 3; // Limit to horizon

  // Instantiate a loader
  const loader = new GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    '../temple.gltf',
    // called when the resource is loaded
    (gltf) => {
      scene.add(gltf.scene);
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
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x86a2cf });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // lights
  const hemilight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
  scene.add(hemilight);

  // resize
  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const update = function () {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
  };
};

export default SceneManger;
