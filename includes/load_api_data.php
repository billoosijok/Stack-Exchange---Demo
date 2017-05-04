<?php 

require "request-api.php";
	
$api = API_Connect("https://api.stackexchange.com/" . $_GET['api_dir']);

unset($_GET['api_dir']);

// Using the parameters from $_GET to request the Stack Exchange API
$response = $api->request($_GET);

echo gzdecode($response);

?>