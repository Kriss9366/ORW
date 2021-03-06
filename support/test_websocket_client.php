<?php
	// Requires both the WebBrowser and HTTP classes to work.
	require_once "support/websocket.php";
	require_once "support/web_browser.php";
	require_once "support/http.php";

	$ws = new WebSocket();

	// The first parameter is the WebSocket server.
	// The second parameter is the Origin URL.
	$result = $ws->Connect("ws://localhost:5578/math/?apikey=123456789101112", "http://localhost");
	if (!$result["success"])
	{
		var_dump($result);
		exit();
	}

	// Send a text frame (just an example).
	// Get the answer to 5 + 10.
	$data = array(
		"pre" => "5",
		"op" => "+",
		"post" => "10",
	);
	$result = $ws->Write(json_encode($data), WebSocket::FRAMETYPE_TEXT);

	// Send a binary frame in two fragments (just an example).
	// Get the answer to 5 * 10.
	$data["op"] = "*";
	$data2 = json_encode($data);
	$y = (int)(strlen($data2) / 2);
	$result = $ws->Write(substr($data2, 0, $y), WebSocket::FRAMETYPE_BINARY, false);
	$result = $ws->Write(substr($data2, $y), WebSocket::FRAMETYPE_BINARY);

	// Main loop.
	$result = $ws->Wait();
	while ($result["success"])
	{
		do
		{
			$result = $ws->Read();
			if (!$result["success"])  break;
			if ($result["data"] !== false)
			{
				// Do something with the data.
				echo "Raw message from server:\n";
				var_dump($result["data"]);
				echo "\n";

				$data = json_decode($result["data"]["payload"], true);
				echo "The server said:  " . $data["question"] . " = " . $data["answer"] . "\n\n";
			}
		} while ($result["data"] !== false);

		$result = $ws->Wait();
	}

	// An error occurred.
	var_dump($result);
?>