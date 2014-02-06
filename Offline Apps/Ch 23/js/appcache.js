var appstatus, app; 

appstatus = document.getElementById('applicationstatus');
app = document.getElementById('application');

var doIfAppCache = function(){  
	var p, progress;
	
	p = document.createElement('p');
	progress = document.createElement('progress');
	
	progress.classList.add('hidden');
	
	appstatus.appendChild(p);
	appstatus.appendChild(progress);
	
	/* Create a reusable snippet for updating our messages */
	function updatemessage(string){
		var message = document.createTextNode(string);
		if(p.firstChild){
			p.replaceChild(message,p.firstChild)
		} else {
			p.appendChild(message);
		}
	}

    function checkinghandler(){
    	appstatus.classList.remove('hidden');
    	updatemessage('Checking for an update...');
    }
    
 
    function downloadinghandler(e){
    	updatemessage('Downloading files...');
        progress.classList.remove('hidden');
    }
        
    function progresshandler(evt){
    	updatemessage('Receiving file '+evt.loaded+ 'of '+evt.total);
    	progress.max   = evt.total;
    	progress.value = evt.loaded;
   	}
    
   	function whendonehandler(){ 
   	  	 updatemessage('Loading application...');
      	 appstatus.classList.add('hidden');
      	 app.classList.remove('hidden'); 
    }
    
    function updatereadyhandler(){
         location.reload();     
    }
    
    function errorhandler(){
         updatemessage('Error downloading update.');     
    }
    
    applicationCache.addEventListener('checking', checkinghandler);
    applicationCache.addEventListener('downloading', downloadinghandler);
    applicationCache.addEventListener('progress', progresshandler);
    applicationCache.addEventListener('updateready', updatereadyhandler);
    applicationCache.addEventListener('cached', whendonehandler);
    applicationCache.addEventListener('noupdate', whendonehandler);
    applicationCache.addEventListener('error', errorhandler);
}

function loadhandler(){
    if( window.applicationCache !== undefined){
       	app.classList.add('hidden');
        appstatus.classList.add('hidden');
        
        doIfAppCache();
    }
}

window.addEventListener('DOMContentLoaded', loadhandler);