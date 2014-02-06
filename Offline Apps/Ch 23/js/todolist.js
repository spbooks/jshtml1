var f = document.getElementById('addnew'), 
    deletecompleted = document.getElementById('delete'), 
    list = document.getElementById('list');

function addItemToList(itemtxt, status) {
	'use strict';
    var li = document.createElement('li');
	
	/* 
	If there is no status parameter, assume this is a new item. Save it, and set its 
	status to 0. Otherwise, just build the list item and add it.
	*/
	if (status === undefined) {
		status = 0;
		localStorage.setItem(itemtxt, status);
	}
		
	if (status == true) { li.classList.add('done'); }
	
	/* Update the innerHTML value of our list item and add as a child of our list */
	li.innerHTML = itemtxt;
	list.appendChild(li);
}

/* 
Using a technique known as event delegation.
If we click on our list element, we will check whether the actual item clicked on was a
list item by checking the 'nodeName' property. If so, we'll update the status of the item.
If not, we'll do nothing.

More about event delegation: http://davidwalsh.name/event-delegate
*/
function toggleStatus(e) {
    'use strict';
	var status;
	if (e.target.nodeName == 'LI') {
	    status = localStorage.getItem(e.target.textContent);
		if (status == false) {
			localStorage.setItem(e.target.textContent, 1);
		} else if (status == true) {
			localStorage.setItem(e.target.textContent, 0);
		}
		
		/* Toggle a 'done' class */
		e.target.classList.toggle('done');
	}
}

function loadList() {
    'use strict';
	var len = localStorage.length, key;
	while (len--) {
		/* Gets the key name at the len numeric index */
		key = localStorage.key(len);
		addItemToList(key, localStorage.getItem(key));
	}
}

function clearCompleted() {
    'use strict';
	var done = document.querySelectorAll('.done'),
	    list = document.getElementById('list'),
        i = 0,
	    len = done.length; 
	
    while ( i < len ) {
        localStorage.removeItem(done[i].innerHTML); /* Delete from storage */
		list.removeChild(done[i]); /* Remove from list */
        i++;
	}
}

function storagehandler(event) {
    'use strict';
	var msg;
	if (event.oldValue === null) {
		msg = 'Looks like you added a new task in another window. Reload?';
	} else {
		msg = 'You changed the status of "' + event.key +' " in another window. Reload?';
	}
	if (window.confirm(msg)) {
		window.location.reload();		
	} 

}

f.addEventListener('submit', function(e){
    'use strict';
	e.preventDefault();
	addItemToList(document.getElementById('newitem').value);
		
	/* Clear the input field */
	document.getElementById('newitem').value = '';
});

list.addEventListener('click', toggleStatus);

window.addEventListener('load', loadList);

deletecompleted.addEventListener('mousedown', clearCompleted);

window.addEventListener('storage', storagehandler);
