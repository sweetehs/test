var app = angular.module('routeApp', ["ui.router"]).run(function($rootScope, util) {
	$rootScope.test = "root test";
	util.log("app run");
});
app.controller("leftCtrl", function($scope) {
	$scope.name = "leftCtrl";
})
Mock.mockjax(app);