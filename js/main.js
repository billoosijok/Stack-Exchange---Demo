// Dependncies
const UI = require('./ui.js')
const mustache = require("./mustache.min.js");
var api = require("./request-api.js");

// Overwriting the 'api' module with the main function needed from it.
api = new api.API_Connect({url: 'includes/load_api_data.php'});

api.request({
	'site' : 'stackoverflow',
	'api_dir' : 'questions/featured'
}, function(result, status) {
	console.log(result);
});

// UI.wrapper.innerHTML = Mustache.to_html(UI.template.innerHTML, response);