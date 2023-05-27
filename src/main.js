import * as THREE from "three";

// Scene
const scene = new THREE.Scene();
const sizes = {
  width: 800,
  height: 600,
};
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);
// * position
// mesh.position.set(0.7, -0.6, 1);
// // * scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.25;
// mesh.scale.z = 0.5;
// // * rotation
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);
camera.position.z = 3;
// * camera lookAt
camera.lookAt(new THREE.Vector3(0, -1, 0));
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});

// * axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// * add everything into the scene
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
