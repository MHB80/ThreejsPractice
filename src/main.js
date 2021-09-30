import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols"
import "./style.css"; // Import the stylesheet for webpack
let RenderNeeded
function main() {
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
  camera.position.z = 2;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a2a3a)


  const light = new THREE.SpotLight(0xaa00dd, 1, 70, 5)
  light.position.set(1, 0, 1)

  scene.add(light)

  //orbit control
  let controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const helper = new THREE.CameraHelper(camera);
  scene.add(helper);

  const axeshelper = new THREE.AxesHelper()
  scene.add(axeshelper)
  function newMaterialShow(width, height) {
    //creating the plane
    const planematerial = new THREE.MeshPhongMaterial({ color: 'brown' })
    const planegeometry = new THREE.PlaneGeometry(width, height)
    const plane = new THREE.Mesh(planegeometry, planematerial)
    scene.add(plane)
    //creatig an sphere
    const spheregeometry = new THREE.SphereGeometry(.5)
    const spherematerial = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const sphere = new THREE.Mesh(spheregeometry, spherematerial)
    sphere.position.set(0, 0, 0)
    sphere.material.color = new THREE.Color('white')
    scene.add(sphere)
    function changematerial(mat) {
      // coping the previous material information
      sphere.material = mat

    }
  }

  newMaterialShow(10, 10)
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {


    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (!RenderNeeded) {
      renderer.setAnimationLoop(render)
      renderer.render(scene, camera);
      RenderNeeded = false
    } else {
      renderer.setAnimationLoop(null)
    }
    RenderNeeded = true



    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
