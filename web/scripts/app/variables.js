define(function(){
  
  //Hola
  var ws = new WebSocket("ws://localhost:9999/ws");  //change example.com with your host
  ws.onopen = function(evt) {
    console.log("Connected:");
    console.log(evt);
  };

  ws.onmessage = function(evt) {
    var newMessage = document.createElement('p');
    newMessage.textContent = "Server: " + evt.data;
    console.log(newMessage);
  };

  ws.onclose = function(evt) {
    alert ("Connection closed");
  };
  
  //We'll use websockets here to construct and object
  var data = {
    hola: "hola",
    adios: "adios"
  }
  
  return data;
});