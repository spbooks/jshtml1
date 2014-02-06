<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache'); 
ob_implicit_flush(true);
ob_end_flush();
while (true) {
  sleep(2);
  $curl=curl_init('http://api.icndb.com/jokes/random');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result=curl_exec($curl);
  echo "data:$result\n\n";
}
?>