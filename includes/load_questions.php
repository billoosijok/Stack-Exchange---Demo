<?php 

require "request-api.php";
	
function load_latest_questions() {
	$api = API_Connect("https://api.nytimes.com/svc/search/v2/articlesearch.json");

	$response = $api->request([
		"api-key" 	=> "d2353bad3ca84cb0a014d6984edad346",
		"q"			=> "New+York"
	]);

	return $response;
}


?>