import * as THREE from "three"

import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols"
import "./style.css"; // Import the stylesheet for webpack
//import hotkeys from 'hotkeys-js'
import{GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { Color } from "three";

function main()
{
  const canvas = document.querySelector('#canvas')
  const renderer = new THREE.WebGLRenderer({canvas})

  //creating the camera
  const camera =new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,5)
  camera.position.z =3
  //creating the scene
  const scene = new THREE.Scene()

  //creating a simple cube
  function cube(xlocation,_color)
  {
    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshBasicMaterial({color:_color})
    const cube = new THREE.Mesh(geometry,material)
    cube.position.x =xlocation
    scene.add(cube)
    return cube
  }
  //creating cube
  cube(0,0xff0000)
  cube(1,0x00ff00)
  cube(2,0x0000ff)
  //creating light
    // -_- aaaaaaaaaaah
    const directionalLight = new THREE.DirectionalLight(0xffff00, 1)
    directionalLight.position.set(0, 0, -4)
    scene.add(directionalLight)
  
 
  
  { 
  let controls = new THREE.OrbitControls(camera,renderer.domElement)
  controls.enableDamping = true
  }
  renderer.render(scene,camera)
  {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

main()

