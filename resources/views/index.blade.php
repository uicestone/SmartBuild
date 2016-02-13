<!DOCTYPE html>
<html>
<head>
	<title>一步智能楼宇方案构建系统</title>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="A front-end template that helps you build fast, modern mobile web apps.">
    <meta name="viewport" content="width=1000, initial-scale=1.0">

    <!-- Disable tap highlight on IE -->
    <meta name="msapplication-tap-highlight" content="no">

    <!-- Web Application Manifest -->
    <link rel="manifest" href="manifest.json">

    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="Web Starter Kit">
    <link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png">

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Web Starter Kit">
    <link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">

    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
    <meta name="msapplication-TileColor" content="#3372DF">

    <meta name="theme-color" content="#3372DF">
	<link rel="stylesheet" type="text/css" href="{{ url(elixir('assets/css/app.css')) }}">
    <!--[if lte IE 8]>
        <script src="bower_components/html5shiv/dist/html5shiv.js"></script>
        <script src="bower_components/html5shiv/dist/html5shiv-prinshiv.js"></script>
    <![endif]-->
</head>
<body>
<div id="main"></div>


<!--[if lte IE 8]>
    <script src="{{ url('packages/es5-shim/es5-shim.js') }}"></script>
    <script src="{{ url('packages/es5-shim/es5-sham.js') }}"></script>
<![endif]-->

{{--<script type="text/javascript" src="{{ url(elixir('assets/js/libraries.js')) }}"></script>--}}
<script type="text/javascript" src="{{ url(elixir('assets/js/app.js')) }}"></script>
</body>
</html>