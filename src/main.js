import * as THREE from "three"
import * as TWEEN from "@tweenjs/tween.js"
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols"
import "./style.css"; // Import the stylesheet for webpack
import { LineSegments, ShapeGeometry, Sphere } from "three";
//import hotkeys from 'hotkeys-js'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
function main() {
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias:true });

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
  camera.position.z = 2;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a2a3a)

  
  const light2 = new THREE.SpotLight(0xffaabb, 1, 70, 5)
  light2.position.set(0,-2,0)
  
  scene.add(light2)
  const light3 = new THREE.SpotLight(0xaa00dd, 1, 70, 5)
  light3.position.set(1,0,1)
  
  scene.add(light3)

  //orbit control
  let controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

const spheregeometry = new THREE.SphereGeometry(.5)
const spherematerial = new THREE.MeshPhongMaterial({color : 0xffffff})
const sphere = new THREE.Mesh(spheregeometry,spherematerial)
sphere.position.set(0,0,0)
sphere.material.color =new THREE.Color('white')
scene.add(sphere)


const helper = new THREE.CameraHelper( camera );
scene.add( helper );

const axeshelper = new THREE.AxesHelper()
scene.add(axeshelper)
  function changematerial(inputobj,wantedmaterial)
  {
    // coping the previous material information
    let newmaterial,newgeometry,newmesh;
    switch (wantedmaterial) {
      
      case 'Basic':
        inputobj.remove()
        newmaterial = new THREE.MeshBasicMaterial({color:inputobj.material.color})
        newgeometry = sphere.geometry.clone()
        newmesh = new THREE.Mesh(newgeometry,newmaterial)
        scene.add(newmesh)
        break;
      case 'phong':
        inputobj.remove()
        newmaterial = new THREE.MeshPhongMaterial({color:inputobj.material.color})
        newgeometry = sphere.geometry.clone()
        newmesh = new THREE.Mesh(newgeometry,newmaterial)
        scene.add(newmesh)
        break;
      case 'lambert':
        inputobj.remove()
        newmaterial = new THREE.MeshLambertMaterial({color:inputobj.material.color})
        newgeometry = sphere.geometry.clone()
        newmesh = new THREE.Mesh(newgeometry,newmaterial)
        scene.add(newmesh)
        break;
      default:
        break;
    }
  }
  changematerial(sphere,'lambert')
  //changematerial(sphere,'Basic')
  //changematerial(sphere,'phong')
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
