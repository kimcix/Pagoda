import SceneManager from './SceneManager';

const canvas = document.getElementById('canvas');
const scene = new SceneManager(canvas);

scene.onWindowResize()
scene.update()


bindEventListeners();
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    scene.onWindowResize();
}

function render() {
    requestAnimationFrame(render);
    scene.update();
}
