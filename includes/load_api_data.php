<?php 

require "request-api.php";


if ($_SERVER['REQUEST_METHOD'] == "GET") {
	
	$dir = $_GET['api_dir'];
	unset($_GET['api_dir']);

	echo file_get_contents('../questions.json');
	// echo load_stackexchange_api_data($dir, $_GET);
}


function load_stackexchange_api_data($dir, $params) {
	
	$api = API_Connect("https://api.stackexchange.com/" . $dir);

	// Using the parameters from $_GET to request the Stack Exchange API
	$response = $api->request($params);

	return gzdecode($response);

}







?>