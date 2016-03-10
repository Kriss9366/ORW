//Formatowanie strony przy użyciu jQuery

$(document).ready(//Kiedy dokument się załaduje.
	function(){
		$('#jeden').insertBefore('#trzy'); //Dodawanie poza i za danym elementem
		$('#but3').appendTo('#dwa'); //Dodawanie wewnątrz i za istniejącym elementem
		$('<input id="but4" type=button  value="Button query" >').insertBefore('#jeden');//Dodanie całkiem nowego przycisku
		$('#but4').on('click',function(){$('#trzy').find('p').text("Tekst");});//Dodanie funkcjonalności dla wcześniej utworzonego przycisku
		
		
	}
);






