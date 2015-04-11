// Set up the scene, camera, and renderer as global variables.

var scene, camera, renderer;

init();
animate();

// Sets up the scene.
function init() {
  // Create the scene and set the scene size.
  scene = new THREE.Scene();
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
  scene.fog = new THREE.Fog( 0xd0eaff, 1, 3000 )

  // Create a renderer and add it to the DOM.
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild( renderer.domElement );

  // Create a camera, zoom it out from the model a bit, and add it to the scene.
  camera = new THREE.PerspectiveCamera(45, (WIDTH / HEIGHT), 0.01, 10000);
  camera.position.set(0, 0.03, 200);
  scene.add(camera);

  //Prepare lights
  ;(function(){
		// add a ambient light
		var light	= new THREE.AmbientLight( 0x020202 )
		scene.add( light )
		// add a light in front
		var light	= new THREE.DirectionalLight('white', 0.3)
		light.position.set(5, 5, 20)
		scene.add( light )
		// add a light behind
		var light	= new THREE.DirectionalLight('white', 0.2)
		light.position.set(0, 10, -20)
		scene.add( light )
        // add a light in sky
        var light = new THREE.HemisphereLight(0xE3F4FF, 0xBCE1F9, 1.001);
        light.position.set(0,500,500);
        scene.add(light);
	})()
  
  
  var quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
  
  //Set the ground
  
  //Prepare texture
  var grassTexture	= THREE.ImageUtils.loadTexture("images/grass.jpg");
  var material = new THREE.MeshPhongMaterial( {color: 0x99BC55, map: grassTexture} );
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(1, 1);
  grassTexture.anisotropy = 16;

//  var geometry = new THREE.CircleGeometry  (1000);
  var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -Math.PI/2; //Horizontal plane
  plane.position.set(-10, -10, -300); //Move a little bit
  
  scene.add( plane );
  
  //Make the sky
  geometry = new THREE.SphereGeometry (2000);
  var cloudTexture = THREE.ImageUtils.loadTexture("images/clouds.jpg");
  cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
  cloudTexture.repeat.set(10, 10);
  cloudTexture.anisotropy = 16;
  material = new THREE.MeshPhongMaterial({color: 0xB8EEFF, side: THREE.DoubleSide, map: cloudTexture} );
  var sky = new THREE.Mesh( geometry, material );
  scene.add( sky );
  
  //Make a cylinder
  
  //Woord texture
  var woodTexture	= THREE.ImageUtils.loadTexture("images/wood.jpg");
  var material = new THREE.MeshPhongMaterial( {color: 0x84522D, map: woodTexture} );
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(10, 10);
  grassTexture.anisotropy = 16;
  
  var cgeometry = new THREE.CylinderGeometry( 10, 20, 50, 32 );
  var cmaterial = new THREE.MeshLambertMaterial ( {color: 0x84522D, wireframe: false, map: woodTexture } );
  var cylinder = new THREE.Mesh( cgeometry, cmaterial );
  cylinder.rotation.x = Math.PI/2; //Vertical cylinder
  cylinder.position.set(100, -100, 25);
  plane.add( cylinder );
  
  // Add OrbitControls so that we can pan around with the mouse.
  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Renders the scene and updates the render as needed.
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();
}