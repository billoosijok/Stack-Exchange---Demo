<?php require_once "includes/header.inc.php"; ?>
	
	<div id="site-wrapper">
		<form action="" class="col s12" id="options-filter">
			<div class="row">
				<?php 
					require_once "includes/request-api.php";
					$sites = API_Connect("https://api.stackexchange.com/sites")->request($params = []);
					$sites = json_decode(gzdecode($sites));
					
					// If statement : to be sure the api resturns correctly
					if (isset($sites->items) && count($sites->items)) {
						?>
						<div class="input-field col s6">
							<select name="site" id="site-select">
								<option value="" disabled selected>Choose Stack Exchange Site</option>
						<?php			
						foreach ($sites->items as $item) { 
						?>
							<option value="<?php echo $item->api_site_parameter ?>" data-icon="<?php echo $item->icon_url ?>" class="left circle"><?php echo $item->api_site_parameter ?></option>
					<?php
						}
						?>
							</select>
							<label for="site-select">Site:</label>
						</div>
						<?php
					}
					
				 ?>
							
			</div>
		</form>
		<div id="content-wrapper" class="main"></div>
	</div>
	
	<script type="text/template" id="template">
		{{#items}}
			<div class="row">
			<div class="card small col s4">
			    <div class="card-image waves-effect waves-block waves-light">
			      <img class="activator" src="{{owner.profile_image}}">
			    </div>
			    <div class="card-content">
			      <span class="card-title activator grey-text text-darken-4">{{title}}<i class="material-icons right">more_vert</i></span>
			      <p>By: <a href="{{owner.link}}">By:{{owner.display_name}}</a></p>
			    </div>
			    <div class="card-reveal">
			      <span class="card-title grey-text text-darken-4">{{title}}<i class="material-icons right">close</i></span>
			      <p>By: {{owner.display_name}}</p>
			    </div>
			</div>
			

		{{/items}}
		{{^items}}
			<p>No data</p>
		{{/items}}
		
	</script>


<?php require_once "includes/footer.inc.php"; ?>