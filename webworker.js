var first = document.querySelector('#number1');
var second = document.querySelector('#number2');
var guzik = document.querySelector('#guzik');
var result = document.querySelector('.result');

if (window.Worker) { //Sprawdzamy czy przeglądarka wspiera WebWorker
	var myWorker = new Worker("worker.js"); //Tworzymy nowy wątek

	guzik.onclick=function() {//Obsługa wysłania danych do wątku; informacja w konsoli
		 myWorker.postMessage([first.value,second.value]); 
	  console.log('Wysłano do workera');
	}

	myWorker.onmessage = function(e) {//ODebranie danych z wątku i ich przetworzenie; info w konsoli
		result.textContent = e.data;
		console.log('Odebrano od workera');
	};
}
