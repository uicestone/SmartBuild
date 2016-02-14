<!DOCTYPE html>
<html ng-app="smartbuild">

	<head>

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="author" content="Uice Lu">
		<meta name="renderer" content="webkit">

		<title>一步智能楼宇方案构建系统 - 管理后台</title>
		
		<base href="<?=url('admin')?>/">
		<link href="<?=url(elixir('assets/css/admin.css'))?>" rel="stylesheet">

		<script type="text/javascript">
			var url = '<?=env('URL')?>';
			var apiBase = '<?=env('URL_API', env('URL') . '/api/v1')?>/';
			var adminUrl = '<?=env('URL_ADMIN', env('URL') . '/admin')?>';
		</script>
		<script type="text/javascript" src="<?=url(elixir('assets/js/admin.js'))?>"></script>
	</head>

	<body>

		<div id="wrapper">

			<!-- Navigation -->
			<nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="margin-bottom: 0" ng-controller="NavController">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle"  ng-click="navIsCollapsed = !navIsCollapsed">
						<span class="sr-only">导航</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<span class="navbar-brand">一步智能楼宇方案构建系统 - 管理后台</span>
				</div>
				<!-- /.navbar-header -->

				<ul class="nav navbar-top-links navbar-right">
					<li class="dropdown" dropdown>
						<a href="" class="dropdown-toggle" dropdown-toggle>
							<i class="fa fa-user fa-fw"></i> {{ user.name }} <i class="fa fa-caret-down"></i>
						</a>
						<ul class="dropdown-menu dropdown-user" dropdown-menu>
							<li><a ng-click="logout()"><i class="fa fa-sign-out fa-fw"></i> 登出</a>
							</li>
						</ul>
						<!-- /.dropdown-user -->
					</li>
					<!-- /.dropdown -->
				</ul>
				<!-- /.navbar-top-links -->

				<div class="navbar-default sidebar" role="navigation">
					<div class="sidebar-nav navbar-collapse" collapse="navIsCollapsed">
						<ul class="nav" id="side-menu">
							<li class="sidebar-search">
								<div class="input-group custom-search-form">
									<input type="text" class="form-control" placeholder="搜索..." disabled="disabled">
									<span class="input-group-btn">
										<button class="btn btn-default" type="button" disabled="disabled">
											<i class="fa fa-search"></i>
										</button>
									</span>
								</div>
								<!-- /input-group -->
							</li>
							<li>
								<a href="module"><i class="fa fa-edit fa-fw"></i> 模块</a>
							</li>
							<li>
								<a href="parameter"><i class="fa fa-dashboard fa-fw"></i> 参数</a>
							</li>
							<li>
								<a href="product"><i class="fa fa-edit fa-fw"></i> 产品</a>
							</li>
							<li>
								<a href="user"><i class="fa fa-user fa-fw"></i> 用户</a>
							</li>
						</ul>
					</div>
					<!-- /.sidebar-collapse -->
				</div>
				<!-- /.navbar-static-side -->
			</nav>

			<div id="page-wrapper" ng-view></div>

		</div>
		<!-- /#wrapper -->

		<div class="alert-container" ng-controller="AlertController">
			<alert ng-repeat="alert in alerts" type="{{alert.type}}" ng-mouseenter="toggleCloseButton($index)" ng-mouseleave="toggleCloseButton($index)">
				<button ng-show="alert.closeable" type="button" class="close" ng-click="close(alert.id)">
					<span aria-hidden="true">×</span>
					<span class="sr-only">Close</span>
				</button>
				{{alert.msg}}
			</alert>
		</div>
		
	</body>

</html>
