define(['./opts'], function(opts){
  //We'll use websockets here to construct and object
  var vars = {
    skycolor: "blue",
    clouds: 10,
    humidity: 10,
    rain: 10,
    sunx: 10,
    suny: 10
  }
  setInterval(function () {vars.clouds += 10}, 3000);
  
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