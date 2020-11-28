import SceneManager from './SceneManager';
import Pagoda from './Objects/Pagoda';

const canvas = document.getElementById('canvas');
const scene = new SceneManager(canvas);

scene.update();

const pagoda = new Pagoda('hello');
const boston = new Pagoda('boston');

pagoda.sayName();
boston.sayName();
