app.controller("sidebarCtrl", function($scope, $state, $http, $rootScope) {
	console.log($rootScope.test);
	$scope.navList = [{
		hash: "module1",
		name: "list test",
		id: '1'
	}, {
		hash: "module2",
		name: "module2",
		id: '2'
	}];

	function setActive(hash) {
		$scope.navList.forEach(function(_data, index) {
			if (hash.indexOf(_data.hash) !== -1) {
				$scope.currentIndex = index;
			}
		});
	}
	$scope.$on("$stateChangeStart", function() {
		console.log("开始解析模板");
	});
	$scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
		console.log("完成解析模板");
		setActive(toState.name);
	});
});
app.directive("sidebar", function(util) {
	return {
		restrict: "E",
		templateUrl: "sidebar/sidebar.html",
		scope: {},
		link: function(scope, element, attrs) {
			/*
				scope:{}  代表隔离的scope，不能获取父元素里面的scope的值
			*/
			console.log(scope.name);
			util.log("sidebar run");
		}
	};
})