<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Print Wikipedia</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <script src="js/modernizr-2.6.2.min.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="pw-width navbar-text">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<div id="pw-mob-title" class="navbar-brand visible-xs">
					Print Wikipedia</div>
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><a href="#/">Print &#xe02f;ikipedia</a></li>
						<li><a href="#/table-of-contents">Wikipedia Table of Contents</a></li>
						<li><a href="#/appendix">Wikipedia Contributor Appendix</a></li>
						<li><a href="#/about">About</a></li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.pw-width -->
		</nav>
		<div class="pw-container pw-width" data-current-template="about">
			<div id="view" class="about">
				<!-- about text is default, for SEO purposes. -->
				<?php require('spinner.js.tmpl'); ?>
				<div id="#about-seo" class="hidden">
					<?php require('about.js.tmpl'); ?>
				</div>
			</div>
		</div> <!-- /.container -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
		<script>window.jQuery || document.write('<script src="js/jquery-1.10.2.min.js"><\/script>')</script>
		<script type="text/html" id="tmpl-about">
			<?php require('about.js.tmpl'); ?>
		</script>
		<script type="text/html" id="tmpl-credits">
			<?php require('credits.js.tmpl'); ?>
		</script>
		<script type="text/html" id="tmpl-list">
<div id="list-region">
</div>
		</script>
		<script type="text/html" id="tmpl-book">
			<?php require('book.js.tmpl') ?>
		</script>
		<script type="text/html" id="tmpl-spinner">
			<?php require('spinner.js.tmpl') ?>
		</script>
		<script>
			window.g = {};
			g.c = {
				BETA: <?php 
if($_GET['beta'])
	echo 'true';
else
	echo 'false'; 
?>,
				LOADER_PATH: "img/spinner3.gif",
				IMG_DIR: "https://s3.amazonaws.com/printwikipedia/img/thumbs",
				ITEM_WIDTH: 180,
				ITEM_MARGIN: 20,
				PRELOAD_THUMBS: false,
				LULU_URL: function(token){
					return "http://www.lulu.com/shop/product-" + token + ".html";
				}
			};

			g.tmpl = function(name){
				return _.template( 
					//use data-src in templates so when template is required for SEO
					//needs, images are not loaded, but they are when used by JS
					$( '#tmpl-' + name ).html().replace(/data-src=/gi,'src='), 
					{variable: 'c'}
				);
			}
		</script>
		<script src="js/router.js"></script>
    <script src="js/bootstrap.min.js"></script>
		<script src="js/underscore.js"></script>
		<script src="js/plugins.js"></script>
		<script src="js/scroll.js"></script>
		<script src="js/FontLoader.js"></script>
		<script src="js/main.js"></script>
	</body>
</html>

