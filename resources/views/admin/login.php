<!DOCTYPE html>
<html ng-app="smartbuild">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">

		<title>登录 - 一步智能楼宇方案构建系统 - 管理后台</title>

		<base href="<?=url()?>">
		<link href="<?=url(elixir('assets/css/admin.css'))?>" rel="stylesheet">
		<script type="text/javascript" src="<?=url(elixir('assets/js/admin.js'))?>"></script>
		<script type="text/javascript">
			var url = '<?=env('URL')?>';
			var apiBase = '<?=env('URL_API', env('URL') . '/api/v1')?>/';
			var adminUrl = '<?=env('URL_ADMIN', env('URL') . '/admin')?>';
		</script>
	</head>

	<body>
		<div class="container" ng-controller="LoginController">
			<div class="row">
				<div class="col-md-4 col-md-offset-4">
					<div class="login-panel panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">请登录</h3>
						</div>
						<div class="panel-body">
							<form role="form" method="post" ng-submit="login()">
								<fieldset>
									<div class="form-group">
										<input class="form-control" placeholder="用户名" ng-model="username" type="text" autofocus>
									</div>
									<div class="form-group">
										<input class="form-control" placeholder="密码" ng-model="password" type="password">
									</div>
									<div class="checkbox">
										<label>
											<input name="remember" type="checkbox" ng-model="remember">记住
										</label>
									</div>
									<!-- Change this to a button or input when using this as a form -->
									<button type="submit" class="btn btn-lg btn-success btn-block">登录</button>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

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
