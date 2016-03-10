	function getXMLHttpRequest()
{//Tworzenie obiektu komunikacji asynchronicznej w zale¿noœci od przegl¹darek(Mozilla,IE,Starsze IE)
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

r = getXMLHttpRequest();//Utworzony obiekt, dla konkretnej przegl¹darki


function processResponse(){//Wykonywane po zmianie stanu po³¹czenia
    if (r.readyState == 4) {//Jeœli dane zosta³y przes³ane
        if (r.status == 200) {//Jeœli z danymi wszystko w porz¹tku
			return r.responseText;
        };
    };
}

r.open('GET', 'plik.txt', true);//Polecenie pobrania pliku poprzez metodê oraz czy ma siê to odbywaæ asynchronicznie
r.onreadystatechange = processResponse;//Przypisanie zdarzenia, które ma siê wykonaæ po zmianie stanu po³¹czenia; referencja
r.send(null);//Wys³anie polecenia pobrania pliku na serwer

function popup() {//wykonanie skryptu php
document.location.href = "cronjob.php?start=true"
}

function popup1() {
//Wyœwietlenie pobranych danych w odpowiednio sformatowanym "miejscu"
	var el;
			el = document.getElementById('tresc');
			el.innerHTML = processResponse();
			el.style.border = '2px solid red';
			el.style.background = '#fef4e0';
}