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
  let cube1 = cube(0,0xff0000)
  cube(1,0x00ff00)
  cube(2,0x0000ff)
  //creating light
    // -_- aaaaaaaaaaah
    const directionalLight = new THREE.DirectionalLight(0xffff00, 1)
    directionalLight.position.set(0, 0, -4)
    scene.add(directionalLight)
  { 
  let controls = new OrbitControls(camera,renderer.domElement)
  controls.enableDamping = true
  }
  
  {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
   //creting the animation

   let position = cube1.position
   let tween = createjs.Tween.get(position)
   tween.to({x:200},1000) 
   //tween.play()

   //animatation
  window.requestAnimationFrame(animate)


  function animate(){
    renderer.render(scene,camera)
    window.requestAnimationFrame(animate)
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
  }

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

 
}

main()

