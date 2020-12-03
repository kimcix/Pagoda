import {
  WebGLRenderer, Scene, Color, FogExp2, AxesHelper, PerspectiveCamera, HemisphereLight,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Entity from './Objects/Entity';

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

    this.temple = new Entity('../../temple.gltf', this.scene);

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
