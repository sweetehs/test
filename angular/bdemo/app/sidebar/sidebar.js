app.controller("sidebarCtrl", function($scope, $state, $http, $rootScope) {
	console.log($rootScope.test);
	console.log($scope.$parent.name);
	console.log($scope.name);
	$scope.navList = [{
		hash: "module1",
		name: "list test",
		id: '1'
	}, {
		hash: "module2",
		name: "module2",
		id: '2'
	}, {
		hash: "injectorTest",
		name: "injectorTest",
		id: "3"
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
		scope: false,
		link: function(scope, element, attrs) {
			/*
				scope值
				true,创建子作用域。可以通过scope.name,scope.$parent.name获取;
				false,不创建子作用域 可以通过scope.name获取，不能通过scope.$parent.name获取;
				tru,false，原型继承，子可以修改父的值
				{}  代表隔离的scope，不能通过scope.name获取,可以通过scope.$parent.name获取;
				@  父变子变 子变父不变
				=  双向绑定
				&  表达式
			*/
			console.log(scope.name);
			scope.name = "change name"
			util.log("sidebar run");
		}
	};
})