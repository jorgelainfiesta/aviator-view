define(['./opts', './utils', 'color'], function(opts, utils, Color){
  
  //We'll use websockets here to construct and object
  
  //Computed properties
  var skycolor = Color("#fd951c");
  
  var vars = {
    skycolor: skycolor.toString(),
    clouds: 10,
    humidity: 10,
    rain: 10,
    sunx: 10,
    suny: 10,
    windspeed: 10,
    ambientcolor: skycolor.lightenByRatio(0.4).toString(),
    change: true
  }
  console.log(vars);
  
//  setInterval(function () {
//    
//  }, 3000);
  
  var socket = new WebSocket(opts.socketurl);

  // On Message Receive
  socket.onmessage = function(evt) {
      console.log('socket receive');
      console.log(evt.data);
  }

  // On Socket Close
  socket.onclose = function() {
      console.log('socket closed');
  }

  // On Error
  socket.onerror = function() {
      console.log('socket error');
  }

  // On Connection Establish
  socket.onopen = function(evt) {
      console.log('socket open');

      // Send a Message!
      socket.send('hello world!');
  }

  // On Send Complete
  socket.onsend = function(evt) {
      console.log('socket send');
      console.log(evt);
  }
  
  
  return vars;
});