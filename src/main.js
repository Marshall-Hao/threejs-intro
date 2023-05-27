import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// Scene
const scene = new THREE.Scene();
// const sizes = {
//   width: 800,
//   height: 600,
// };
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);
// * position
// mesh.position.set(1, -1, 0);
// // * scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.25;
// mesh.scale.z = 0.5;
// // * rotation
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;
scene.add(mesh);

// Camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height
// );
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.z = 3;
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);

// camera.position.y = 0.5;
// camera.position.x = 0.5;

// * camera lookAt
// camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});
const controls = new OrbitControls(camera, canvas);

// * axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// * add everything into the scene
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// * resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

// * for animation
const clock = new THREE.Clock();

const animate = () => {
  //  objects rotate
  // mesh.rotation.y += 0.01;

  const elapsedTime = clock.getElapsedTime();

  // mesh.rotation.y = elapsedTime;
  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.z = Math.sin(elapsedTime);

  // camera.fov += 0.1;

  // camera.updateProjectionMatrix();

  //  * update the render (needs to put inside the recursion fn, since need the renderer re-render each frame,to feel the change)
  controls.update();
  renderer.render(scene, camera);
  // animate again on the next frame
  // window.requestAnimationFrame(animate);
};

renderer.setAnimationLoop(animate);

animate();
