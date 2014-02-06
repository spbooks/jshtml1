navigator.geolocation.getCurrentPosition(success_callback,error_callback);
    
 function success_callback(position){
      console.log("Hey, there you are at Longitude:"+position.coords.longitude+"and latitude:"+position.coords.latitude);
 }
 function error_callback(error){
    var msg="";
     switch(error.code){
         case 1:
             msg="Permission denied by user"; 
             break;
         case 2:
             msg="Position unavailable";
             break;
         case 3:
             msg="Request Timed out";
             break;
    }
    console.log("Oh snap!! Error logged: "+msg);
 }