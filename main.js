import { convertToTexture } from "three/tsl";
import "./style.css";
import * as THREE from "three";

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x03fcc2 });
const cube = new THREE.Mesh(geometry, material);
const clickSound = new Audio("images/playstation-slogan.mp3");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

scene.add(cube);
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([cube]);

  if (intersects.length > 0) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

const xMaterial = new THREE.MeshBasicMaterial({ color: 0xdb0f94 });
const barGeometry = new THREE.PlaneGeometry(20, 2);
const bar1 = new THREE.Mesh(barGeometry, xMaterial);
bar1.rotation.z = Math.PI / 4;
const bar2 = new THREE.Mesh(barGeometry, xMaterial);
bar2.rotation.z = -Math.PI / 4;

bar1.position.x = 28;
bar2.position.x = 28;
scene.add(bar1);
scene.add(bar2);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const coneGeometry = new THREE.ConeGeometry(8, 10, 10);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x8844aa });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);

cone.position.set(-25, 9, 0);

scene.add(cone);

const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

torus.position.z = -40;

scene.add(torus);

const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load("images/ocean.jpg");
scene.background = bgTexture;

function animate() {
  requestAnimationFrame(animate);

  // Movement
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  bar1.rotation.x += 0.01;
  bar2.rotation.y += 0.01;
  cone.rotation.x += 0.01;
  torus.position.x += 0.23;
  torus.rotation.y -= 0.07;
  torus.rotation.x += 0.08;
  if (torus.position.x > 200) {
    torus.position.x = -200;
  }

  renderer.render(scene, camera);
}

animate();
