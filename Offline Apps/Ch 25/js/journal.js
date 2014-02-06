var idb = indexedDB.open('myIDBJournal',1), 
	databaseObj, 
	form = document.forms[0], 
	today = new Date(),
	table = document.querySelector('table'),
	allentries = document.querySelector('#allentries'),
	addnew = document.querySelector('#addnew');


table.addEventListener('click', function(e){
	e.preventDefault();
	var target = e.target, entry, t, o, e;

	if( target.nodeName == 'A'){
		entry = +target.hash.replace(/\D/,'');
	}

	t = databaseObj.transaction(['entries'],'readonly');
	o = t.objectStore('entries');
	e = o.get(entry);

	e.onsuccess = function(evt){
		form.tags.value  = evt.target.result.tags;
		form.entry.value = evt.target.result.entry;
		form.key.value   = evt.target.result.entrydate;
	
		allentries.classList.add('hidden');
		addnew.classList.remove('hidden');
	}
});

idb.onupgradeneeded = function(event){
	event.target.result.createObjectStore('entries',{keyPath:'entrydate'});

}

idb.onsuccess = function(event){
	databaseObj = event.target.result;
}

function showAllEntries(){
	var transaction, objectstore, cursor, tbody = document.querySelector('tbody');
	
	// Clear existing rows on view all screen.
	// We'll rebuild the list each time
	tbody.innerHTML = ''; 
	
	transaction = databaseObj.transaction(['entries'],'readonly');
	objectstore = transaction.objectStore('entries');

	cursor = objectstore.openCursor();

	cursor.onsuccess = function(e) {
		var resultset = e.target.result;

		if( resultset !== null ){
			buildListItem( resultset.value );
			resultset.continue();
		} 	
	};	
}

function buildListItem(entry){
	var o,
		tr = document.createElement('tr'),
		a = document.createElement('a'),
		edate = document.createElement('td'),
		tags = document.createElement('td'),
		tbody = document.querySelector('tbody');

	a.href = "#"+entry.entrydate;
	a.innerHTML = new Date(+entry.entrydate).toDateString();
	edate.appendChild(a);  
	tags.innerHTML  = entry.tags == undefined ? '' : entry.tags;

	tr.appendChild( edate );
	tr.appendChild( tags );

	tbody.appendChild(tr);
	allentries.classList.remove('hidden');
	addnew.classList.add('hidden');
}

form.onsubmit = function(submitEvent){
	submitEvent.preventDefault();

	var entry = {}, i, transaction, objectstore, request, fields = submitEvent.target;

	/* Build our record object */
	entry.entrydate = (fields.key.value == '') ? today.getTime() : +fields.key.value;

	for( i=0; i < fields.length; i++){
		if( fields[i].value !== '' ){
			entry[fields[i].name] = fields[i].value;
		}
	}

	transaction  = databaseObj.transaction(['entries'],'readwrite');
	objectstore  = transaction.objectStore('entries');
	request      = objectstore.put(entry);

	/* Should the operation work  */
	request.onsuccess = showAllEntries;
}

document.getElementById('date').value = today.getFullYear() +'-'+ (today.getMonth()+1) +'-'+ today.getDate();



