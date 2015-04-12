define(function(require){
  
  //Load animation module
  var animation = require("./animate");
  
  //Run animate
  animation.animate;
  
  //Load GUI
  var gui = require("./gui");
  
  //Insert into body
  document.body.appendChild( animation.renderer.domElement);
});