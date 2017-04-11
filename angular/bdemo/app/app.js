var app = angular.module('routeApp', ["ui.router", "ngDialog"]).run(function($rootScope, util) {
	$rootScope.test = "root test";
	util.log("app run");
});
app.controller("leftCtrl", function($scope) {
	$scope.name = "leftCtrl";

	setTimeout(function() {
		$scope.$apply(function() {
			console.log($scope.name);
		});
	}, 2000);
})
// Mock.mockjax(app);