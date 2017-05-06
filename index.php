<?php require_once "includes/header.inc.php"; ?>
	
	<div id="site-wrapper">
		<header class="teal darken-1 blue-grey-text text-lighten-5">
			<div class="container">
				<h1>Stack Exchange API</h1>
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
					</div>
				</form>
			</div>
		</header>
		<main class="main grid" id="sections-wrapper">
			<div class="container">
				<div class="row">
				
				</div>
 			</div>
		</main>
	</div>
	
	<script type="text/template" id="section-template">
		<section id="{{id}}" class="questions-section">
			<div class="row">
				<h3 class="col s6">{{title}}</h3>
				<a id="refresh" class="waves-effect waves-light right btn refresh"><i class="material-icons left">loop</i>Refresh</a>
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
	              <span class="card-title"><a target="_blank" class="white-text" href="{{link}}">{{title}}</a></span>
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
							Reputation: {{owner.reputation}}
						</div>
		              </div>
	              </div>
	            </div>
	          </div>
		{{/items}}
		{{^items}}
			<div class="card">
				<div class="card-content">
					<i class="material-icons left">warning</i><span class="card-title">Couldn't Load Data</span>
				</div>
			</div>
		{{/items}}
		      </div>

	</script>


<?php require_once "includes/footer.inc.php"; ?>