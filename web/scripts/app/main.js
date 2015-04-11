define(function(require){
  //Load webgl scene
  var scene = require("./scene");
  
  //Load tree
  var clouds = require("./clouds");
  //scene.plane.add(clouds);
  
  //Load variables
  var variables = require("./variables");
 
	scene.scene.add(clouds.mesh);
	
  //Animate
  function animate() {
    requestAnimationFrame(animate);
    
    //Apply controls
    //transforms.applyAll(tree, opts.tree, memotree);
    //transforms.applyAll(house, opts.house, memohouse);
    
    //Apply transforms from variables
		scene.renderer.render(scene.scene, scene.camera);
		scene.controls.update();
		

  }
  animate();
  
  document.body.appendChild( scene.renderer.domElement );
});