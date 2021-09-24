import * as THREE from "three"
import * as TWEEN from "@tweenjs/tween.js"
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols"
import "./style.css"; // Import the stylesheet for webpack
import { LineSegments, ShapeGeometry } from "three";
//import hotkeys from 'hotkeys-js'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
function main() {
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({canvas});

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
  camera.position.z = 2;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a2a3a)

  const light  = new THREE.SpotLight(0xffff,2,70,5)
  light.lookAt(0,0,0)
  scene.add(light)

  //orbit control
  let controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 1);
  controls.update();

  //camerahelper
  const camerahelper =new THREE.CameraHelper(camera)
  scene.add(camerahelper)
  //axis hekperr

  // const axesHelper = new THREE.AxesHelper( 100 );
  // scene.add( axesHelper );


  //creating a simple plane
  function createsquare(planewidth,planeheight,squarelength){ 
  const geometry = new THREE.PlaneGeometry( planewidth , planeheight );
  const material = new THREE.MeshBasicMaterial( {color: 0xfffffff, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );
  scene.add( plane );

  //drawing vertical line we use height for that everytime
  //wew have to make the height sliced
  const slice_height_num = planeheight/squarelength
  let slice_height_point = []
  let next_height_slice = planeheight/2
  for(let i = 0 ; i< slice_height_num ; i++)
  {
    slice_height_point.push(next_height_slice) 
    next_height_slice=next_height_slice - squarelength
  } 

  const slice_width_num = planewidth/squarelength
  let slice_width_point = []
  let next_width_slice = planewidth/2
  for(let i = 0 ; i<slice_width_num ; i++)
  {
    slice_width_point.push(next_width_slice)
    next_width_slice = next_width_slice -squarelength
  }
  
  //creating the corresponding points to connect them to 
  //each other in the plane

  let Lline_width_points = []
  for(let i in slice_width_point)
  {
    Lline_width_points.push(new THREE.Vector2(-planewidth/2,slice_width_point[i]))
  }
  
  let Rline_width_points = []
  for(let i in slice_width_point)
  {
    Rline_width_points.push(new THREE.Vector2(planewidth/2,slice_width_point[i]))
  }

  //as kwnonT both sides have same quantity so they will
  //be same either Lline-width-points or Rlines-width-oints
  for(let i in Rline_width_points )
  {
    drawline(Rline_width_points[i],Lline_width_points[i])
  }

  let Tline_height_points = []
  for(let i in slice_height_point)
  {
    Tline_height_points.push(new THREE.Vector2(slice_height_point[i],planeheight/2))
  }
  let Dline_height_points = []
  for(let i in slice_height_point)
  {
    Dline_height_points.push(new THREE.Vector2(slice_height_point[i],-planeheight/2))
  }
  for(let i in Dline_height_points)
  {
    drawline(Dline_height_points[i],Tline_height_points[i])
  }
  }
  createsquare(10,15,0.25)
function drawline(left_point,right_point)
{
  const points = []
  points.push(right_point,left_point)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({color : 0x000000})
  const line =  new THREE.Line(geometry,material)
  scene.add(line)
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
