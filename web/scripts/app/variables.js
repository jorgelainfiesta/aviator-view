define(['./opts', './utils', 'color'], function(opts, utils, Color){
  
  //We'll use websockets here to construct and object
  
  //Computed properties
  var skyTop = Color("#0a0a0e");
  var skyBottom = Color("#583f54");
  
  var vars = {
    skyTop: skyTop.toString(),
    skyBottom: skyBottom.toString(),
    clouds: 0.2,
    humidity: 0.1,
    rain: 10,
    sunx: 10,
    suny: 10,
    windspeed: 0.2,
    ambientcolor: skyBottom.lightenByRatio(0.4).toString(),
    change: true,
		AircraftID: 'D1',
		AircraftType: '3R',
		Latitude: 14.5859987,
		Longitude: -90.570235, 
		Altitude: 15000,
		Speed: 34,
		City: 'Guatemala City',
		Temperature: 89
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
    alert("DAMN!");
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