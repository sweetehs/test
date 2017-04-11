app.controller('injectorTest', injectorTest);

function injectorTest($scope, stateParams, http, util) {
	$scope.name = "injectorTest";
	util.log("injectorTest");
}
// injectorTest.$inject = ["$scope", "stateParams", "http", "util"];