app.controller('module1', function($scope, stateParams, http) {
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
})