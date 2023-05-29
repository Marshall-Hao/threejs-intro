import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshDepthMaterial();
const donutGeometry = new THREE.TorusGeometry(
  0.3,
  0.2,
  20,
  45
);

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 1, 1);

const geos = [donutGeometry, BoxGeometry];
for (let i = 0; i < 100; i++) {
  const donut = new THREE.Mesh(
    geos[Math.floor(Math.random() + 0.5)],
    material
  );

  donut.position.x = (Math.random() - 0.5) * 10;
  donut.position.y = (Math.random() - 0.5) * 10;
  donut.position.z = (Math.random() - 0.5) * 10;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);
  scene.add(donut);
}
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);

camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;

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
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );
});

// * for animation
const clock = new THREE.Clock();

const animate = () => {
  //  objects rotate
  // mesh.rotation.y += 0.01;

  const elapsedTime = clock.getElapsedTime();

  const children = scene.children;
  children.forEach((element, i) => {
    element.rotation.y = elapsedTime;
    element.position.x +=
      (Math.cos(elapsedTime) * 0.005 * i) / 10;
    element.position.x +=
      (Math.sin(elapsedTime) * 0.005 * i) / 10;
    element.position.x +=
      (Math.sin(elapsedTime) * 0.005 * i) / 10;
  });
  //  * update the render (needs to put inside the recursion fn, since need the renderer re-render each frame,to feel the change)
  controls.update();
  renderer.render(scene, camera);
  // animate again on the next frame
  // window.requestAnimationFrame(animate);
};

renderer.setAnimationLoop(animate);

animate();
