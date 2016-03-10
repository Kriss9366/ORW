<?php
	require_once "support/http.php";

	require_once "support/simple_html_dom.php";

	// Simple HTML DOM tends to leak RAM like
	// a sieve.  Declare what you will need here.
	// Objects are reusable.
	$html = new simple_html_dom();

	$url = "http://www.bankier.pl/waluty";

	$result = HTTP::RetrieveWebpage($url);
	$prawda = true;
	
	if (($prawda == true)||(isset($_GET['start'])))
	{	if (!$result["success"])  echo "Error retrieving URL.  " . $result["error"] . "\n";
	else if ($result["response"]["code"] != 200)  echo "Error retrieving URL.  Server returned:  " . $result["response"]["code"] . " " . $result["response"]["meaning"] . "\n";
	else
	{
		$currency=array();
		$value=array();
		$changes=array();
		$fp = fopen("plik.txt", "a");
		echo "Pobrałem Kursy NBP";
		
		$html->load($result["body"]);
		$divs = $html->find("div");
		
		foreach ($divs as $div)
		{if ($div->id == 'boxKursyNbpTab1' ) 
			{	
				foreach($div->find('span') as $element) {
				if($element->class == 'name')
				{
					foreach($element->find('a') as $a)
					$currency[]=$a->innertext." ";
					
				}
				if($element->class=="value")
				{
					$value[]=$element->innertext." ";
					
				}
				if($element->class=="changeValue")
				{
					$changes[]=$element->innertext." ";
				}
				}
			}
		};

		for ($i=0;$i<5;$i++)
		{
			fputs($fp, date("Y-m-d,h-i-s",time()).": ".$currency[$i]." ".$value[$i]." ".$changes[$i]."<br>"." ");
		}
		

		fclose($fp);
		





	}
}
?>
