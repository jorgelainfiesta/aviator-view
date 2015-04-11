define(["OrbitControls", "./variables"], function(THREE, opts){
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
  //var grassTexture	= THREE.ImageUtils.loadTexture(opts.grassURL);
  //var material = new THREE.MeshPhongMaterial( {color: 0x99BC55, map: grassTexture} );
	var material = new THREE.MeshBasicMaterial( { color: 0x7F7F79 } )
  //grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  //grassTexture.repeat.set(100, 100);
  //grassTexture.anisotropy = 16;
  
  var geometry = new THREE.PlaneBufferGeometry(2200, 2200);
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -Math.PI/2; //Horizontal plane
	//  plane.position.set(-10, -10, -300); //Move a little bit
  scene.add( plane ); 
	
  
  //Set up the sky
  geometry = new THREE.SphereGeometry (2000);
  //var cloudTexture = THREE.ImageUtils.loadTexture(opts.cloudsURL);
  //cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
  //cloudTexture.repeat.set(10, 10);
  //cloudTexture.anisotropy = 16;
	var material = new THREE.MeshBasicMaterial( { color: 0x7F7F79 } )
  //material = new THREE.MeshPhongMaterial({color: 0xB8EEFF, side: THREE.DoubleSide, map: cloudTexture} );
  var sky = new THREE.Mesh( geometry, material );
  scene.add( sky );
    
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  return {"renderer": renderer, "camera" : camera, "scene" : scene, "controls" : controls, "plane" : plane, "sky" : sky};
});