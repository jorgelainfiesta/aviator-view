define(["OrbitControls", "./opts", "./variables"], function(THREE, opts, vars){
  var scene, camera, renderer;
  //Set up scene
  scene = new THREE.Scene();
  
  //Set up renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(opts.swidth, opts.sheight);
  
  //Set up camera
  camera = new THREE.PerspectiveCamera(45, (opts.swidth / opts.sheight), opts.near, opts.far*1.5);
  camera.position.set(0, 15, 400);
  scene.add(camera);
  
  //Set up fog
  var fog =  new THREE.Fog( 0xd0eaff, 1, opts.far*.70);
  scene.fog = fog;

  
  //Set up lights
  var lights = {
    ambient: new THREE.AmbientLight(0x020202),
    front: new THREE.DirectionalLight('white', 0.3),
    back: new THREE.DirectionalLight('white', 0.2),
    hemisphere: new THREE.HemisphereLight(0xE3F4FF, 0xBCE1F9, 1.001)
  }
  //Add ambient
  scene.add(lights.ambient);
  
  //Add a light in front
  lights.front.position.set(5, 5, 20);
  scene.add(lights.front);
  
  // add a light back
  lights.back.position.set(0, 10, -20)
  scene.add(lights.back);
  
  // add a light in sky
  lights.hemisphere.position.set(0, 500, 500);
  scene.add(lights.hemisphere);
  
  //Set up ground
//  var material = new THREE.MeshPhongMaterial( {color: 0x99BC55} );
	
	var url = "http://maps.googleapis.com/maps/api/staticmap?zoom=9&size=1024x1024&scale=2&maptype=satellite&center="+vars.Latitude+","+vars.Longitude;
	
	var google = THREE.ImageUtils.loadTexture( url );
//	var google = THREE.ImageUtils.loadTexture( "././images/map.png" );
	var material = new THREE.MeshLambertMaterial({ map : google });
  var geometry = new THREE.PlaneBufferGeometry(1024, 1024);
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -Math.PI/2; //Horizontal plane
	plane.position.y -= 20;
//  plane.position.set(-10, -10, -300); //Move a little bit
  scene.add( plane );
  
  //Set up the sky
  geometry = new THREE.SphereGeometry (800);
  material = new THREE.MeshPhongMaterial({color: 0xB8EEFF} );
  var sky = new THREE.Mesh( geometry, material );
	sky.material.side = THREE.DoubleSide;
  scene.add( sky );
    
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  return {"renderer": renderer, "camera" : camera, "scene" : scene, "controls" : controls, "plane" : plane, "sky" : sky, "lights" : lights, "fog": fog};
});