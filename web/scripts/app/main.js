define(function(require){
  //Load webgl scene
  var scene = require("./scene");
  
  //Load tree
  var clouds = require("./clouds");
  //scene.plane.add(clouds);
  
  //Load variables
  var variables = require("./variables");
  
  var memcloud = '';
  
  //Animate
  function animate() {
    requestAnimationFrame(animate);
    //Do frame rendering
    scene.renderer.render(scene.scene, scene.camera);
    scene.controls.update();
    if(variables.clouds != memcloud){
      console.log(variables.clouds);
      memcloud = variables.clouds;
    }

  }
  animate();
  
  //Insert into body
  document.body.appendChild( scene.renderer.domElement );
});