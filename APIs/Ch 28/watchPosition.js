var watchId;
function startWatchingPosition() {
  watchId=navigator.geolocation.watchPosition(plotPosition);
}

function plotPosition(position){
  console.log(
    'got position: Latitude='+
    position.coords.latitude+
    ', longitude='+
    position.coords.longitude
  );

  // your code to update the position on map
}

function stopWatchingPosition(){
  navigator.geolocation.clearPosition(watchId);
}