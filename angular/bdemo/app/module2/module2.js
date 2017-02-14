routeApp.controller('module2', function($scope, stateParams, $state) {
	$scope.message = "This id of module2 is " + stateParams.id;
})