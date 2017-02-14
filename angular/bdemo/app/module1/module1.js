routeApp.controller('module1', function($scope, stateParams) {
	$scope.message = "This id of module1 is " + stateParams.id;
})