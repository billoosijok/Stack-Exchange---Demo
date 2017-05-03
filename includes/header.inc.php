<?php 

require "load_questions.php"; 
$json = load_latest_questions();

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Stack Exchange</title>
	
	<!-- <script src="https://unpkg.com/react@15/dist/react.js"></script>
	<script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
	<script src="https://unpkg.com/babel-standalone@6/babel.js"></script> -->
	
	<script type="text/javascript">
		response = <?php echo "$json" ?>.response;
		

		<?php 
			if ($_GET['log_json']) { ?>

				console.log(response);

			<?php }

		?>
	</script>
	
</head>
<body>
	<script type="text/template" id="template">
