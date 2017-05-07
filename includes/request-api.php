<?php 

    /**
    * Creates an API Connection
    */
    class API {
    	
    	public $url = null;

    	public function __construct($url) {
    		$this->url = $url;
    	}

    	public function request($params, $curlOptions = []) {
    		$curl = curl_init();
			    		
    		$request_parameters = "";
    		foreach ($params as $key => $value) {
    			$request_parameters .= "$key=$value&";
    		}

    		$options = [
		        CURLOPT_URL => $this->url . "?" . $request_parameters,
		        CURLOPT_RETURNTRANSFER => true,
            	CURLOPT_TIMEOUT => 10,
		        CURLOPT_HEADER => false,
			] + $curlOptions;

		    curl_setopt_array($curl, $options);
		    
		    $json = curl_exec($curl);	
            
		    curl_close($curl);

		    return $json;
    	}
    }

    function API_Connect($url) {
        return new API($url);
    }
?>