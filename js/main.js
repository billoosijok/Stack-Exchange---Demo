// GLOBALS
var reqParams = {
	'api_dir' : 'questions',
	'pagesize' : 15,
	
}

var pagesize = 15;

var cur_site = 'stackoverflow';
var cur_layoutMode = 'rows';

var cur_template_id = 'template';

const sections = [
	{'title' : 'Latest Questions','api_dir' : 'questions', 'id': 'latest-questions'},
	{'title' : 'ALL Questions','api_dir' : 'questions', 'id': 'l-questions'},
	{'title' : 'ALL Questions','api_dir' : 'questions', 'id': 'lat-questions'},
	{'title' : 'ALL Questions','api_dir' : 'questions', 'id': 'st-questions'}
];

$(function() {
	
	const UI = {

		// Content Wrapper
		sections_wrapper : document.getElementById('sections-wrapper'),
		
		// Templates 
		sections_template : document.getElementById('section-template'),

		// Options Form
		layout_select : document.getElementById('layout-select'),
		site_select : document.getElementById('site-select'),

		// Buttons
		refresh_button : document.getElementById('refresh')
	}

	init(UI);


});

function init(UI) {

	// Loading preferences
	init_preferences();

	// Material Inits
	$('select').material_select();	

	// Overwriting the 'api' module with the main function needed from it.
	api = new API_Connect({url: 'includes/load_api_data.php'});

	load_sections(15);

	function load_sections(numberOfQuestions) {
		
		var template = UI.sections_template;
		var wrapper = $(UI.sections_wrapper).find('.container .row');

		for (var i = 0; i < sections.length; i++) {
			
			var cur_section = sections[i]
			var section = $(Mustache.to_html(template.innerHTML, cur_section));
			wrapper.append(section);
			
			// Setting initial layout mode
			setLayoutModeTo(cur_layoutMode);

			var content_wrapper = section.find('.content-wrapper');

			load_questions({
			
				'site' : cur_site,
				'api_dir' : cur_section.api_dir,
				'pagesize' : numberOfQuestions,
				'fromdate' : Math.round((Date.now() - (60 * 60 * 24 * 7)) / 1000)
			
			}, content_wrapper[0] /* [0] converts jq element to dom element */);

			$(section).find('.refresh').click(function(e) {
				
				var theButton = $(this);
				var content_wrapper = theButton.parentsUntil('.questions-section').parent().find('.content-wrapper');

				theButton.addClass('disabled');

				load_questions({
					
					'site' : cur_site,
					'api_dir' : cur_section.api_dir,
					'pagesize' : numberOfQuestions,
					'fromdate' : Math.round((Date.now() - (60 * 60 * 24 * 7)) / 1000)
				
				}, content_wrapper[0], function() {

					theButton.removeClass('disabled');

				});
			});
		}
	}

	function refresh_sections() {
		$('.refresh.btn').click();
	}

	$(UI.site_select).on('change', function(e) {
		setCurrentSite($(this).val());
	});

	$(UI.layout_select).on('change', function(e) {
		setLayoutModeTo($(this).val())
	});

	function load_questions(reqParams, wrapper, callback) {

		callback = callback || function() {}
		
		wrapper.innerHTML = "<p>Please Hold ...</p> 			\
							<div class='progress'>				 \
      							<div class='indeterminate'></div> \
  							</div>"
		
		api.request(reqParams, function(result, status) {

			// Converting the String result to a json object
			result = JSON.parse(result);
			
			var template = document.getElementById(cur_template_id);

			wrapper.innerHTML = Mustache.to_html(template.innerHTML, result);
			
			callback();
		});
	}

	function setCurrentSite(site) {
		cur_site = site;
		refresh_sections();

		localStorage.setItem('site', site);
	}

	function init_preferences() {
		
		cur_site = localStorage.getItem('site') || 'stackoverflow';
		cur_layoutMode = localStorage.getItem('layoutMode') || 'rows';

		$(UI.site_select).val(cur_site);
		$(UI.layout_select).val(cur_layoutMode)

	}

}

function setLayoutModeTo(mode) {
		
		switch (mode) {
			
			case 'grid':
				$('.questions-section').addClass('col s5');
				
				break;
			
			default:
				reset_layout();
				
				break;
		}

		localStorage.setItem('layoutMode', mode);

		function reset_layout() {
			$('.questions-section').attr('class', 'questions-section');
		}
	}