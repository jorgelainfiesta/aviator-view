define(['datgui', './variables'], function(dat, opts){
   
  var tree = opts.tree;
  var house = opts.house;
  
  var gui = new dat.GUI();
  
  var farbol = gui.addFolder('Árbol');
  var fatrans = farbol.addFolder('Traslación');
  fatrans.add(tree, 'x', -600, 600);
  fatrans.add(tree, 'y', -600, 600);
  fatrans.add(tree, 'z', -100, 500);
  var farot = farbol.addFolder('Rotación');
  farot.add(tree, 'rx', 0, 2*Math.PI);
  farot.add(tree, 'ry', 0, 2*Math.PI);
  farot.add(tree, 'rz', 0, 2*Math.PI);
  var fashe = farbol.addFolder('Shear');
  fashe.add(tree, 'sxy', -1.5, 1.5);
  fashe.add(tree, 'syx', -1.5, 1.5);
  fashe.add(tree, 'szy', -1.5, 1.5);
  var fashe = farbol.addFolder('Scale');
  fashe.add(tree, 'sx', 0, 5);
  fashe.add(tree, 'sy', 0, 5);
  fashe.add(tree, 'sz', 0, 5);
  
  var fhouse = gui.addFolder('Casa');
  var fhtrans = fhouse.addFolder('Traslación');
  fhtrans.add(house, 'x', -600, 600);
  fhtrans.add(house, 'y', -600, 600);
  fhtrans.add(house, 'z', -100, 500);
  var fhrot = fhouse.addFolder('Rotación');
  fhrot.add(house, 'rx', 0, 2*Math.PI);
  fhrot.add(house, 'ry', 0, 2*Math.PI);
  fhrot.add(house, 'rz', 0, 2*Math.PI);
  var fhshe = fhouse.addFolder('Shear');
  fhshe.add(house, 'sxy', -1.5, 1.5);
  fhshe.add(house, 'syx', -1.5, 1.5);
  fhshe.add(house, 'szy', -1.5, 1.5);
  var fhshe = fhouse.addFolder('Scale');
  fhshe.add(house, 'sx', 0, 5);
  fhshe.add(house, 'sy', 0, 5);
  fhshe.add(house, 'sz', 0, 5);
  
  gui.add(opts, 'wireframe');
  
  var audio = new Audio('audio/folding-door-open-1.mp3');
  
  //Door stuff
  var doorObj = new function(){
    this.doOpen = function(){
      if(opts.door.moving){
        audio.stop();
      } else {
        opts.door.moving = true;
        opts.door.open = !opts.door.open;
        audio.play();
      }
      
    }
  }
  gui.add(doorObj, "doOpen");

  
  return {'tree' : tree, 'house' : house};
});