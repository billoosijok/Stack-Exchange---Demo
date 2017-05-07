// GLOBALS
var numberOfQuestions = 15;
var cur_site = 'stackoverflow';
var cur_layoutMode = 'rows';

const sections = [
	{'title' : 'Unanswered Questions','api_dir' : 'questions/unanswered', 'id': 'unanswered-questions'},
	{'title' : 'Latest Questions','api_dir' : 'questions', 'id': 'latest-questions'}
];

var active_sections = [];

$(function() {
	
	const UI = {

		// Content Wrapper
		sections_wrapper : document.getElementById('sections-wrapper'),
		
		// Templates 
		sections_template : document.getElementById('section-template'),

		// Options Form
		layout_select : document.getElementById('layout-select'),
		site_select : document.getElementById('site-select'),
		sections_select : document.getElementById('sections-select'),
		numberOfQuestions_range : document.getElementById('range-number-of-questions'),

		// Buttons
		refresh_button : document.getElementById('refresh')
	}

	init(UI);

});

function init(UI) {

	// Loading preferences
	init_preferences();

	// API Object to request data
	api = new API_Connect({url: 'includes/load_api_data.php'});

	// Loading sections
	load_sections();

	// Sets up the form controls
	setupFormControls();


	// ============ Functions ============ //

	function load_sections() {
		
		// The tamplate and a wrapper to put the sections into
		var template = UI.sections_template;
		var wrapper = $(UI.sections_wrapper).find('.container .row');

		// Reset
		wrapper.empty();

		// If there are no active sections in the filter, we just load all the sections
		var sections_to_load = (active_sections.length) ? active_sections : sections;

		for (var i = 0; i < sections_to_load.length; i++) {
			
			var cur_section = sections_to_load[i];

			// Building up the section
			var section = $(Mustache.to_html(template.innerHTML, cur_section));
			
			// Adding child as plain js object because 
			// it immediately becomes available to use (aka live DOM element) 
			wrapper[0].appendChild(section[0]);

			// Setting initial layout mode
			setLayoutModeTo(cur_layoutMode);

			// The wrapper to put the questions into
			var content_wrapper = $(section).find('.content-wrapper');

			// Loading questions with params into the wrapper
			load_questions({
			
				'site' : cur_site,
				'api_dir' : cur_section.api_dir,
				'pagesize' : numberOfQuestions,
			
			}, content_wrapper[0] /* [0] converts jq element to dom element */);

			// Attatching a click event to the refresh button
			$(section).find('.refresh-button').on('click', function(e) {
				
				var the_button = $(this);
				var the_section = the_button.parentsUntil('.questions-section').parent();
				var the_content_wrapper = the_section.find('.content-wrapper');

				// Disabling the button so that the user can't refresh again
				the_button.addClass('disabled');

				// Loading questions with params into the wrapper
				load_questions({
					
					'site' : cur_site,
					'api_dir' : the_section.attr('api_dir'),
					'pagesize' : numberOfQuestions,
					
				}, the_content_wrapper[0], function() {

					// Re-enabling the button
					the_button.removeClass('disabled');

				});
			});
			
		}
	}

	function setupFormControls() {
		// Sets up the "filter options" menu
		setupSectionsFilter();

		// Material Inits
		$('select').material_select();

		// Sets up the range control of the "number of questions"
		setupRangeControl()

		// == Functions == //
		function setupRangeControl() {

			// Updating the number of questions shown, then saving it (on mouseup)
			$(UI.numberOfQuestions_range).mouseup(function(event) {
				
				numberOfQuestions = Number($(this).val());
				refresh_sections();

				localStorage.setItem('numberOfQuestions', numberOfQuestions);
			});
		}

		function setupSectionsFilter() {

			// Building the options based on the sections stored in the global array
			for (var i = 0; i < sections.length; i++) {
				UI.sections_select.innerHTML += "<option value='"+sections[i].api_dir+"'>" +sections[i].title+ "</option>";
			}

			// on change: we update the 'active_sections' array and then refresh the sections
			$(UI.sections_select).on('change', function(event) {
				
				var selectedValues = $(this).val();
				var options = $(this).find('option');
				
				// Resetting it for re-build
				active_sections = [];

				// Going through all the options in the menu
				for (var i = 0; i < options.length; i++) {
					if (options[i].selected) {
						
						// Bulding up the sections info by matching its 'api_dir' property 
						// to one of the sections in the global array
						section = {};
						for (var j = 0; j < sections.length; j++) {
							if (sections[j].api_dir == options[i].value) {
								section = sections[j];
								break;
							}
						}
						// Then we add that section object to array of active sections
						active_sections.push(section);
					}
				}

				// We then re-load the sections
				load_sections();
			});
		}	
	}

	function refresh_sections() {
		$('.refresh-button').click();
	}

	$(UI.site_select).on('change', function(e) {
		setCurrentSite($(this).val());
	});

	$(UI.layout_select).on('change', function(e) {
		setLayoutModeTo($(this).val())
	});

	function load_questions(reqParams, wrapper, callback) {

		// Default value if callback was not passed
		callback = callback || function() {}
		
		// Loading indicator
		wrapper.innerHTML = "<p>Please Hold ...</p> 			\
							<div class='progress'>				 \
      							<div class='indeterminate'></div> \
  							</div>"
		
		// Making the api request for the questions
		api.request(reqParams, function(result, status) {

			try {
				// Converting the String result to a json object
				result = JSON.parse(result);
			
			} catch(e) {
				status = 'error';

				// Because if there was an error it won't be an object
				result = {}
			}

			
			// If error_id exists that means there is an error
			if (result.error_id || status == "error") {

				// This will be used by Mustache to laoad this message
				result.message = "Couldn't Load Questions";

			} else {

				// Does some setup needed for some values to be used 
				// by Mustache (like array elements)
				setUpResult(result);
			
			}

			// Finally using the template to show data
			var template = document.getElementById("template");
			wrapper.innerHTML = Mustache.to_html(template.innerHTML, result);
			
			callback();
		
		});

		function setUpResult(result) {
			// Doing any setup to the result object 
			// (it helps creating propety names for Mustache to use)
			
			// Going through each item in the result set
			for (var i = 0; i < result.items.length; i++) {
				
				buildTagUrl(result.items[i]);

			}

			function buildTagUrl(item) {
				// Turned out that 'a' elements have built in propeties 
				// that can parse url's
				var parser = document.createElement('a');
				parser.href = item.link;

				// This is the base url to all tags. 
				// Then we add the tag name to it depending on the tag
				tagBaseUrl = parser.protocol + "//" + parser.hostname + "/tags";

				// We remap the array
				item.tags = item.tags.map(function(item) {
					return {'tag': item, url : tagBaseUrl + "/" + item};
				});
			}
		}
	}

	function setCurrentSite(site) {
		// Sets the current site to the given site param

		cur_site = site;
		refresh_sections();

		localStorage.setItem('site', site);
	}

	function init_preferences() {
		
		// Getting stored preferences values (if they don't exist, we improvise)
		cur_site = localStorage.getItem('site') || 'stackoverflow';
		cur_layoutMode = localStorage.getItem('layoutMode') || 'rows';
		numberOfQuestions = localStorage.getItem('numberOfQuestions') || 15;

		// Then using those values in the select menus
		$(UI.site_select).val(cur_site);
		$(UI.layout_select).val(cur_layoutMode)
		$(UI.numberOfQuestions_range).val(numberOfQuestions)

	}

	function setLayoutModeTo(mode) {

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

}