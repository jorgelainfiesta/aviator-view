define(['./opts', './utils', 'color'], function(opts, utils, Color){
  
  //We'll use websockets here to construct and object
  
  //Computed properties
  var skyTop = Color("#a61cfd");
  var skyBottom = Color("#fd951c");
  
  var vars = {
    skyTop: skyTop.toString(),
    skyBottom: skyBottom.toString(),
    clouds: 0.1,
    humidity: 0.5,
    rain: 10,
    sunx: 10,
    suny: 10,
    windspeed: 0.2,
    ambientcolor: skyBottom.lightenByRatio(0.4).toString(),
    change: true,
		AircraftID: 'D1',
		AircraftType: '3R',
		Latitude: 15.8990,
		Longitude: 14.009, 
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
      alert("FUCK");
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
      alert("FUQ!");
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