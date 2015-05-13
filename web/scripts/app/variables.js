define(['./opts', './utils', 'color'], function(opts, utils, Color){
  
  //We'll use websockets here to construct and object
  
  //Computed properties
//  var skyTop = Color("#73c3fe");
//  var skyBottom = Color("rgb(255,255,255)");
	
	// Color 1
	//var skyBottom = Color("rgb(0,110,204)");
  //var skyTop = Color("rgb(255, 255, 255)");
	
	// Color 2
//	var skyBottom = Color("#005d90");
//  var skyTop = Color("#FFFFFF");
	
	
	// Color 3
	var skyBottom = Color("rgb(0,0,0)");
  var skyTop = Color("rgb(0,0,0)");
	
  
  var vars = {
    skyTop: skyTop.toString(),
    skyBottom: skyBottom.toString(),
    clouds: 0.4,
    humidity: -2,
    rain: 10,
    sunx: 10,
    suny: 10,
    windspeed: 0.6,
//    ambientcolor: skyBottom.lightenByRatio(0.9).toString(),
    ambientcolor: skyBottom,
    change: true,
		AircraftID: 'AAL100',
		AircraftType: 'B77W',
		Latitude: 14.5859987,
		Longitude: -90.570235, 
		Altitude: 360,
		Speed: 7.26,
		City: 'Guatemala City',
		Temperature: 23
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