<?php require_once "includes/header.inc.php"; ?>
	
	<div id="site-wrapper">
		<header class="teal darken-1 blue-grey-text text-lighten-5">
			<div class="container">
				<h1><a href="" class="white-text">Stack Exchange</a></h1>
				<form action="" class="col s12" id="options-filter">
					<div class="row">
						<?php 
							require_once "includes/request-api.php";
							// $sites = API_Connect("https://api.stackexchange.com/sites")->request($params = []);
							// $sites = json_decode(gzdecode($sites));
							$sites = json_decode(file_get_contents('sites.json'));

							// If statement : to be sure the api resturns correctly
							if (isset($sites->items) && count($sites->items)) {
								?>
								<div class="input-field col s6">
									<select name="site" id="site-select">
										<option value="" disabled>Choose Stack Exchange Site</option>
								<?php			
								foreach ($sites->items as $item) { 
								?>
									<option value="<?php echo $item->api_site_parameter ?>" data-icon="<?php echo $item->icon_url ?>" class="left circle"><?php echo $item->name ?></option>
							<?php
								}
								?>
									</select>
									<label class="blue-grey-text text-lighten-5" for="site-select">Site:</label>
								</div>
								<?php
							}
						 ?>
						<div class="input-field col s6">
							<select name="layout" id="layout-select">
								<option value="rows" data-icon="images/rows.png" class="left">Rows</option>
								<option value="grid" data-icon="images/grid.png" class="left">Grid</option>
							</select>
							<label class="blue-grey-text text-lighten-5" for="layout-select">Layout</label>
						</div>
						<div class="input-field col s6">
						    <select multiple id="sections-select">
						      <option value="" disabled>Choose sections</option>
						    </select>
						    <label class="blue-grey-text text-lighten-5">Filter Sections</label>
  						</div>
  						<div class="input-field col s2">
  							<div class="select-wrapper">
  								<div class="range-field">
							    	<input id="range-number-of-questions" type="range" min="5" max="30" />
								</div>
  							</div>
							<label class="blue-grey-text text-lighten-5">Number Of Qustions</label>

  						</div>
					</div>
				</form>
			</div>
		</header>
		<main class="main green lighten-5" id="sections-wrapper">
			<div class="container">
				<div class="row">
				
				</div>
 			</div>
		</main>
	</div>
	
	<script type="text/template" id="section-template">
		<section id="{{id}}" class="questions-section" api_dir="{{api_dir}}">
			<div class="row section-title">
				<h3 class="col s6 grey-text text-darken-2">{{title}}</h3>
				<a class="waves-effect waves-light right refresh-button"><i class="material-icons left">loop</i>Refresh</a>
			</div>
			<div class="content-wrapper">
				
			</div>
		</section>
	</script>

	<script type="text/template" id="template">
		<div class="row">
		{{#items}}
	          <div class="card blue-grey darken-1">
	            <div class="card-content">
	            	<div class="row">
		              <h3 class="card-title col s9"><a target="_blank" class="bold white-text" href="{{link}}">{{title}}</a></h3>
		              <div class="right-meta col col s3 right">
						<div class="row">
						<span class="answer-{{is_answered}} new badge white black-text" data-badge-caption="Answers">{{answer_count}}</span>	
						</div>
						<div class="row">
							<span class="new badge white black-text" data-badge-caption="Votes">{{score}}</span>
						</div>
		              </div>
					</div>
					<div class="row" style="margin-bottom: 0;">
						{{#tags}}
							<div class="chip">
							    <a href="{{url}}" target="_blank">{{tag}}</a>
							</div>
						{{/tags}}
					</div>
	            </div>
	            <div class="card-action">
	            	<div class="row" style="margin-bottom: 0;">
		              <div class="col s2 m1 profile_image_container">
		              	<a target="_blank" href="{{owner.link}}">
			              	<img class="responsive-img circle" src="{{owner.profile_image}}">
		              	</a>
		              </div>
		              <div class="col s8">
		              	<div class="row" style="margin-bottom: 0;">
		              		<a href="{{owner.link}}">{{owner.display_name}}</a>
		              	</div>
		           		<div class="row" style="margin-bottom: 0;">
							<span class="white-text">{{owner.reputation}}</span>
						</div>
		              </div>
	              </div>
	            </div>
	          </div>
		{{/items}}
		{{^items}}
			<div class="card z-depth-0 grey lighten-4">
				<div class="card-content">
					<i class="material-icons left">warning</i><span class="card-title">{{message}}</span>
				</div>
			</div>
		{{/items}}
		      </div>

	</script>


<?php require_once "includes/footer.inc.php"; ?>