// test if the browser supports the API
if('WebSocket' in window) {

  var socket = new WebSocket('ws://echo.websocket.org');

  if (socket.readyState == 0) console.log('Connecting...');

  // As soon as connection is opened, send a message to the server
  socket.onopen = function () {
    if (socket.readyState == 1) {
      console.log('Connection Opened');
      socket.send('Hey, send back whatever I throw at you!'); 
    }     
  };

  // Receive messages from the server
  socket.onmessage = function(e) {
    console.log('Socket server said: ' + e.data);
  };

  socket.onclose = function() {
    if (socket.readyState == 2) console.log('Connection Closed');
  };
  
  // log errors
  socket.onerror = function(err) {
    console.log('An Error Occurred ' + err);
  };

}
else {
  // sadly, no WebSockets!
}