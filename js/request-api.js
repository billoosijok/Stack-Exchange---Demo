
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
	this.timeout = params.timeout || 500

	// This will serve as a delay for the request.
	// this is done to prevent multiple calls within 
	// the specified timeout variable
	var _timeOffIntervall = null;

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
		
		// This is used because if it was the first request 
		// it will get set to 0. Otherwise it's the timeout parameter.		
		var delay = this.timeout;

		var reqUrl = this.url + '?' + $.param(params);
		
		if(_timeOffIntervall) {
			clearTimeout(_timeOffIntervall);
		} else {
			delay = 0;
		}

		_timeOffIntervall = setTimeout(function() {

			$.ajax({
	  
			  url: reqUrl,
			  method: (params['method'])? params.method : 'GET',
			
			}).done(function(result, status) {
			  			
			  	callback(result, status);

			}).fail(function(err, status) {
				
				callback(err, status);
			  	throw err;
			
			});

			_timeOffIntervall = null

		}, this.timeout);

	});
}

module.exports = { API_Connect }