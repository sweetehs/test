app.config(["$provide", "$stateProvider", function($provide, $stateProvider) {
	// 注意url开头要加斜杠/
	$stateProvider.state("module1", {
		url: "/module1/:id",
		resolve: {
			// 提供依赖，可以用于onEnter,onExit,Controller等
			stateParams: function($stateParams) {
				return $stateParams;
			}
		},
		templateUrl: 'module1/module1.html',
		onEnter: function(stateParams) {
			console.log("进入了module1");
		},
		onExit: function() {
			console.log("退出了module1");
		},
		controller: "module1"
	}).state("module2", {
		url: "/module2/:id",
		resolve: {
			stateParams: function($stateParams) {
				return $stateParams;
			}
		},
		templateUrl: 'module2/module2.html',
		controller: "module2"
	});
}]);