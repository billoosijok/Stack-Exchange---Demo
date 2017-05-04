// GLOBALS
var reqParams = {
	'site' : 'stackoverflow',
	'api_dir' : 'questions',
	'fromdate' : Math.round((Date.now() - (60 * 60 * 24 * 7)) / 1000)
}


$(function() {
	
	const UI = {

		// Content Wrapper
		content_wrapper : document.getElementById("content-wrapper"),

		// Templates
		template : document.getElementById('template'),
		sites_list_template : document.getElementById('sites-list-template'),

		// Options Form
		seite_select : document.getElementById('site-select')

	}

	init(UI);


});

function init(UI) {

	// Overwriting the 'api' module with the main function needed from it.
	api = new API_Connect({url: 'includes/load_api_data.php'});

	load_questions(UI.content_wrapper, UI.template);
	load_list_of_sites(UI.seite_select, UI.sites_list_template);

	function load_questions(wrapper, template) {

		api.request(reqParams, function(result, status) {
			// Converting the String result to a json object
			result = JSON.parse(result);

			wrapper.innerHTML = Mustache.to_html(template.innerHTML, result);
		});
	}

	function load_list_of_sites(wrapper, template) {
		api.request({
			'api_dir' : 'sites'

		}, function(result, status) {
			// Converting the String result to a json object
			result = JSON.parse(result);

			wrapper.innerHTML += Mustache.to_html(template.innerHTML, result);

			console.log(result);

			// Material Inits
			$(wrapper).material_select();
		});
	}
}


