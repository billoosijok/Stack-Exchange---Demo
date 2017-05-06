
/*	
	It constructs an API object that can be used to make requests to the
	passed api url
	
	@param params (Object) : 
			
			Required properties: 
				- url (String) : The url of the API.
				- apikey (String) : The api key.
			
			Optional properties: 
				- timeout (Number) : The minimum delay-duration between each API call.
*/
function API_Connect(params) {
	
	this.url = params.url
	this.apikey = params.apikey

	/**
	Makes a request to the provided url.
	- @param params (Object) : The parameters of the api request.
	- @param callback (Function) : The function to be called after 
									the request gets a response. 
									Note: It gets passed to parameters:
										- @param result (Object)
										- @param status (String)

	*/
	this.request = ( (params, callback) => {
		

		var reqUrl = this.url + '?' + $.param(params);

		$.ajax({
  
		  url: reqUrl,
		  method: (params['method'])? params.method : 'GET',
		
		}).done(function(result, status) {
		  			
		  	callback(result, status);

		}).fail(function(err, status) {
			
			callback(err, status);
		  	throw err;
		
		}).then(function() {

		});


	});
}
