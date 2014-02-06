window.addEventListener('DOMContentLoaded',function(){
/* Let's initialize our variables */
var video, play, pause, seek, progress, volume;

/*
Here we've assumed that we have a video element in our markup.
We could alternately create a new video element using
document.createElement('video'). In that case, however, we would
also need to use document.body.appendChild() to add the video
object to our DOM tree.

Audio elements have an Audio() constructor that we can use, in 
addition to document.createElement(). In that case, we'd use:
`var audio = new Audio();` and also append it to the document 
body with document.body.appendChild().

document.querySelector is part of the Selectors API
www.w3.org/TR/selectors-api/
*/

video = document.querySelector('video');

/* 
Retrieve our play and pause buttons, along with our seek,
volume and playback controls.
*/
play  = document.getElementById('play');
pause = document.getElementById('pause');
seek     = document.getElementById('seek');
volume   = document.getElementById('volume');
playback = document.getElementById('playback');

/* 
Defines an action to take when one of our buttons 
is clicked.
*/
function clickhandler(event){
    var id = event.target.id;
    if( id === 'play' ){
        video.play();
        video.preload = 'metadata';
        play.classList.add('hidden');
        pause.classList.remove('hidden');
    }
    if( id === 'pause' ){
        video.pause();
        pause.classList.add('hidden');
        play.classList.remove('hidden');
    }  
}
 
function updateduration(event){
    var durationdisplay = document.getElementById('duration'),
        elapsed = document.getElementById('elapsed');
    durationdisplay.innerHTML = formattime( event.target.duration );
    elapsed.innerHTML = formattime( event.target.currentTime );
}

/* Updates the maximum value for our seek and playback progress bars */
function updateseekmax(event){
    if( event.target.duration ){
        seek.max = event.target.duration;
    }
}

function updateplaybackmax(event){
     if( event.target.duration ){
        playback.max = event.target.duration;
    }
}

/* Updates the value of seek */
function updateseek(event){
    if( event.target.currentTime ){
        seek.value = Math.floor( event.target.currentTime );
    }
}

/* Updates the value of progress */
function updateplayback(event){
    if( event.target.currentTime ){
        playback.value = Math.floor( event.target.currentTime );
    }
}

function updatepreload(event){
    event.target.preload == 'metadata';
}

/* Returns a formatted date object */
function formattime(timeinseconds){    
    var zeroes = '0', hours, minutes, seconds, time;
    
    // Create a new date object and pass our time in seconds as the seconds parameter
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    time = new Date(0, 0, 0, 0, 0, timeinseconds, 0);

    hours   = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds()
    
    // Padding in case we have single 0 values. Zeroes is a numeric string, not a number.
    // It will concatenate rather than add.
    // Slice method documentation 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
    hours   = (zeroes + hours).slice(-2);
    minutes = (zeroes + minutes).slice(-2);
    seconds = (zeroes + seconds).slice(-2);
    
    // Create a time string.
    time = hours + ':' + minutes + ':' + seconds;
    
    // Return the duration.
    return time; 
}

function timeupdatehandler(event){
    var elapsed = document.getElementById('elapsed');
    elapsed.innerHTML = formattime( event.target.currentTime );
}

/* 
When the value of input[id=seek] changes, reset the currentTime
property of the video object
*/

function seekhandler(event){
    video.currentTime = event.target.value; 
    playback.value = event.target.value
}

function volumehandler(event){
    video.volume = event.target.value;   
}

function backtobeginning(event){
    video.currentTime = 0;
    seek.value = 0;
    playback.value = 0;
}


/* 
== Adding event handlers ==
The first parameter is the event that we want to listen for.
The second is the name of the function that should be invoked when
this event occurs.

In some older browsers, you may encounter a "Not enough arguments" 
error. If that occurs, add a third parameter and set it to `false`.
*/
play.addEventListener('mousedown', clickhandler);
pause.addEventListener('mousedown', clickhandler);


/* All of these functions will be called when a durationchange
event is fired */
video.addEventListener('durationchange',  updateduration);
video.addEventListener('durationchange',  updateseekmax);
video.addEventListener('durationchange',  updateplaybackmax);
    
/* 
   durationchange doesn't fire reliably in Firefox versions to date. 
   This is a way to work around that bug.
*/
video.addEventListener('playing',  updateseekmax);
video.addEventListener('playing',  updateplaybackmax);
video.addEventListener('playing',  updateduration);
    
/* All of these will be called when a timeupdate event is fired */
video.addEventListener('timeupdate',  timeupdatehandler);
video.addEventListener('timeupdate',  updateseek );
video.addEventListener('timeupdate',  updateplayback );

/* Called when we change the value of seek or volume */
seek.addEventListener('change',  seekhandler );
volume.addEventListener('change',  volumehandler );

});
