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


  function CreateMaaterial(width, height) {
    //creating the plane
    const planematerial = new THREE.MeshBasicMaterial({ color: 'blue' })
    const planegeometry = new THREE.PlaneGeometry(width, height)
    const plane = new THREE.Mesh(planegeometry, planematerial)
    scene.add(plane)

    //creating the shape
    const spherematerial = new THREE.MeshPhongMaterial({ color: 'pink' })
    const spheregeometry = new THREE.SphereGeometry(.5)
    const shape = new THREE.Mesh(spherematerial, spheregeometry)
    scene.add(shape)

    return {
      'scene': scene,
      'camera': camera,
      'shape': shape,
      'renderer': renderer,
      'light': light,
    }
  }
  function ChangeMAterial(MaterialViewObject, newMaterial) {
    MaterialViewObject.material = newMaterial
    renderer.render(scene, camera)
  }
  const newMaterialView = CreateMaaterial(10, 10)

  ChangeMAterial(newMaterialView, new THREE.MeshPhongMaterial({ color: 'green' }))

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


    renderer.render(scene, camera);


    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
