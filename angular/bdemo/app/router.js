routeApp.config(function($stateProvider) {
	// 注意url开头要加斜杠/
	$stateProvider.state("module1", {
			url: "/module1/:id",
			resolve: {
				stateParams: function($stateParams) {
					return $stateParams;
				}
			},
			templateUrl: 'module1/module1.html',
			controller: "module1"
		})
		.state("module2", {
			url: "/module2/:id",
			resolve: {
				stateParams: function($stateParams) {
					return $stateParams;
				}
			},
			templateUrl: 'module2/module2.html',
			controller: "module2"
		});
});