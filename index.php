<?php require_once "includes/header.inc.php"; ?>
	
	<div id="site-wrapper">
		<form action="" class="col s12" id="options-filter">
			<div class="row">
				<div class="input-field col s6">
					<select name="site" id="site-select">
						
					</select>
					<label for="site-select">Site:</label>
				</div>
			</div>
		</form>
		<div id="content-wrapper" class="main"></div>
	</div>
	
	<script type="text/template" id="sites-list-template" >
		<option value="" disabled selected>Choose Stack Exchange Site</option>
		{{#items}}
			<option value="{{api_site_parameter}}" data-icon="{{icon_url}}" class="left circle">{{api_site_parameter}}</option>
		{{/items}}
	</script>

	<script type="text/template" id="template">
		{{#items}}
			<div class="single_question answer-{{is_answered}}">
				<h3><a href="{{link}}">{{title}}</a></h3>
				<div class="meta">
					{{#owner}}
						<div class="person">
							<div class="image">
								<img src="{{profile_image}}" alt="Profile image of {{display_name}}">
							</div>
							<p class="name"><a href="{{link}}">{{display_name}}</a></p>
						</div>
					{{/owner}}
				</div>
			</div>
		{{/items}}
		{{^items}}
			<p>No data</p>
		{{/items}}
	</script>


<?php require_once "includes/footer.inc.php"; ?>