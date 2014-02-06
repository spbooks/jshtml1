self.addEventListener('message', function(e) {

  console.log(
    'Question: ' + e.data.question + 
    ' asked by: '+e.data.askedBy
   );

  self.postMessage(
    {
      'answer': 'Doing pretty good!',
      'answerer':'Worker'
    }
  );

},false);