app.controller('module1', function($scope, stateParams, http) {
	// http模块只有在注入的时候才会初始化，否则不会
	setTimeout(function() {
		// 执行angular的上下文
		$scope.$apply(function() {
			$scope.btnSearchTitle = "搜索"
		})
	}, 100);
	http.ajax({
		url: "/list",
		method: "get",
		success: function(ajaxData) {
			$scope.list = ajaxData.list;
		},
		error: function() {
			console.error("获取列表失败");
		}
	})
	$scope.myFilter = function(item) {
		if ($scope.key) {
			return item.constellation.indexOf($scope.key) !== -1;
		} else {
			return true;
		}
	}
	$scope.ageFilter = function(item) {
		if (item.age < 20) {
			return true;
		} else {
			return false;
		}
	}
})