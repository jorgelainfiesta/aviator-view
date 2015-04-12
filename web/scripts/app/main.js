define(function(require){
  
  //Load animation module
  var animation = require("./animate");
  
  //Run animate
  animation.animate;
  
  //Insert into body
  document.body.appendChild( animation.renderer.domElement);
});