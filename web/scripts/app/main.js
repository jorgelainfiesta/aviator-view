define(function(require){
  //Load webgl scene
  var scene = require("./scene");
  
  //Load tree
  var clouds = require("./clouds");
  //scene.plane.add(clouds);
  
  //Load variables
  var variables = require("./variables");
  
  //Animate
  function animate() {
    requestAnimationFrame(animate);
		
		// Render the scene.
		scene.renderer.render(scene.scene, scene.camera);
		//controls.update();

  }
  animate();
  
  document.body.appendChild( scene.renderer.domElement );
});