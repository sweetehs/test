routeApp.controller("sidebarCtrl", function($scope, $state) {
	$scope.navList = [{
		hash: "module1",
		name: "module1",
		id: '1'
	}, {
		hash: "module2",
		name: "module2",
		id: '2'
	}];

	function init() {
		$scope.navList.forEach(function(_data, index) {
			if (location.hash.indexOf(_data.hash) !== -1) {
				$scope.currentIndex = index;
			}
		});
	}
	$scope.clickNav = function(data, index) {
		$scope.currentIndex = index;
	};
	init();
});
routeApp.directive("sidebar", function() {
	return {
		templateUrl: "sidebar/sidebar.html"
	};
})