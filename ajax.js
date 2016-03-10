	function getXMLHttpRequest()
{//Tworzenie obiektu komunikacji asynchronicznej w zale�no�ci od przegl�darek(Mozilla,IE,Starsze IE)
    var request = false;
    
    try {
        request = new XMLHttpRequest();
    } catch(err1) {
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(err2) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');                
            } catch(err3) {
                request = false;
            }
        }
    }
    return request;
}    
var r;

r = getXMLHttpRequest();//Utworzony obiekt, dla konkretnej przegl�darki


function processResponse(){//Wykonywane po zmianie stanu po��czenia
    if (r.readyState == 4) {//Je�li dane zosta�y przes�ane
        if (r.status == 200) {//Je�li z danymi wszystko w porz�tku
			return r.responseText;
        };
    };
}

r.open('GET', 'plik.txt', true);//Polecenie pobrania pliku poprzez metod� oraz czy ma si� to odbywa� asynchronicznie
r.onreadystatechange = processResponse;//Przypisanie zdarzenia, kt�re ma si� wykona� po zmianie stanu po��czenia; referencja
r.send(null);//Wys�anie polecenia pobrania pliku na serwer

function popup() {//wykonanie skryptu php
document.location.href = "cronjob.php?start=true"
}

function popup1() {
//Wy�wietlenie pobranych danych w odpowiednio sformatowanym "miejscu"
	var el;
			el = document.getElementById('tresc');
			el.innerHTML = processResponse();
			el.style.border = '2px solid red';
			el.style.background = '#fef4e0';
}