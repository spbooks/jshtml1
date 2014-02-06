var f = document.getElementById('addnew'), 
	deletecompleted = document.getElementById('deletedone'), 
	deleteall = document.getElementById('deleteall'),
	list = document.getElementById('list'),
	overlay = document.getElementById('overlay');

function addItemToList(itemtxt, status) {
	'use strict';
    var li = document.createElement('li');
	
	/* 
	Remove < and > so that we don't inject HTML into our app.
	*/
	itemtxt = itemtxt.replace(/></g,'');
	
	
	/* 
	If there is no status parameter, assume this is a new item. Save it, and set its 
	status to 0. Otherwise, just build the list item and add it.
	*/
	if (status === undefined) {
		status = 0;
		localStorage.setItem(itemtxt, status);
	}
		
	if (+status) { li.classList.add('done'); }
	
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
	    status = +localStorage.getItem(e.target.textContent);
		if (status) {
			localStorage.setItem(e.target.textContent, 0);	
		} else {
			localStorage.setItem(e.target.textContent, 1);
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

function clearAll() {
    list.innerHTML = '';
	localStorage.clear();
}

function storagehandler(event) {
	location.reload();
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
deletecompleted.addEventListener('click', clearCompleted);
deleteall.addEventListener('click', clearAll);
window.addEventListener('storage', storagehandler);
