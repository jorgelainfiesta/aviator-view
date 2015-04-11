define(["OrbitControls", "./opts"], function(THREE, opts){
  var scene, camera, renderer;
  //Set up scene
  scene = new THREE.Scene();
  
  //Set up renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(opts.swidth, opts.sheight);
  
  //Set up camera
  camera = new THREE.PerspectiveCamera(45, (opts.swidth / opts.sheight), opts.near, opts.far*1.5);
  camera.position.set(0, 10, 800);
  scene.add(camera);
  
  //Set up fog
  scene.fog = new THREE.Fog( 0xd0eaff, 1, opts.far*.70);

  
  //Set up lights
  
  // add a ambient light
  var light	= new THREE.AmbientLight( 0x020202 )
  scene.add( light )
  // add a light in front
  light	= new THREE.DirectionalLight('white', 0.3)
  light.position.set(5, 5, 20)
  scene.add( light )
  // add a light behind
  light	= new THREE.DirectionalLight('white', 0.2)
  light.position.set(0, 10, -20)
  scene.add( light )
  // add a light in sky
  light = new THREE.HemisphereLight(0xE3F4FF, 0xBCE1F9, 1.001);
  light.position.set(0,500,500);
  scene.add(light);
  
  //Set up ground
  
  //Textures for grass
  var material = new THREE.MeshPhongMaterial( {color: 0x99BC55} );
  var geometry = new THREE.PlaneBufferGeometry(2200, 2200);
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -Math.PI/2; //Horizontal plane
//  plane.position.set(-10, -10, -300); //Move a little bit
  scene.add( plane );
  
  //Set up the sky
  geometry = new THREE.SphereGeometry (2000);
  material = new THREE.MeshPhongMaterial({color: 0xB8EEFF} );
  var sky = new THREE.Mesh( geometry, material );
  scene.add( sky );
    
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  return {"renderer": renderer, "camera" : camera, "scene" : scene, "controls" : controls, "plane" : plane, "sky" : sky};
});