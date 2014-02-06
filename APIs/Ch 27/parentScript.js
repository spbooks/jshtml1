var worker=new Worker('myworker.js');

worker.addEventListener('message',function(e){
  alert('Got answer: '+e.data.answer+' from: '+e.data.answerer);
},false);

worker.postMessage({'question':'how are you?','askedBy':'Parent'});