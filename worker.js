var result;
onmessage = function(e) {//ODebranie danych i ich przetworzenie; funkcja anonimowa
  console.log('Wczytano dane');//info w konsoli
  result=e.data[0];
 for(var i=1;i<e.data[1];i++)
	{
	result*=e.data[0];
	}
  var workerResult = 'Result: ' + result;
  console.log('Wysłanie danych');
  postMessage(workerResult);} //Wysłanie przetworzonych danych; info w konsoli