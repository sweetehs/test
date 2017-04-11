app.controller('module2', function($scope, stateParams, $state, http, ngDialog, $compile, popup) {
	$scope.format = 'M/d/yy h:mm:ss a';
	$scope.title = "dialog title";
	$scope.popContentClick = function() {
		alert("click dialog content");
	};
	$scope.parentClose = function() {
		alert("click parent close");
		$scope.pclose();
	};
	$scope.dialogpop = function() {
		ngDialog.open({
			template: 'templateId',
			controller: ["$scope", "$rootScope", function($scope, $rootScope) {
				$scope.innerClick = function() {
					alert("innerClick");
				}
			}]
		})
	};
	var $parentScope = $scope;
	popup.open({
		template: "<div ng-click='popup()'>{{autopop}}</div>",
		controller: ["$scope", "$rootScope", function($scope, $rootScope) {
			console.log($parentScope.title);
			$scope.autopop = "text";
			$scope.popup = function() {
				alert("popup");
			}
		}]
	})
	popup.open({
		template: "<div ng-click='popup()'>{{autopop}}</div>",
		controller: ["$scope", "$rootScope", function($scope, $rootScope) {
			$scope.autopop = "text1";
			$scope.popup = function() {
				alert("popup1");
			}
		}]
	});
	// 坑 test是传到directive里面的 ，名称不能有大写，否则访问不到或者报错
	$scope.test = function(value) {
		return [{
			name: "name"
		}]
	}
})
app.directive("myCurrentTime", function($timeout, dateFilter, $compile) {
	return function(scope, element, attrs) {
		var format,
			timeoutId;

		function updateTime() {
			element.text(dateFilter(new Date(), format));
		}

		scope.$watch(attrs.myCurrentTime, function(value) {
			format = value;
			updateTime();
		});

		function updateLater() {
			timeoutId = $timeout(function() {
				updateTime();
				updateLater();
			}, 1000);
		}

		element.bind('$destroy', function() {
			$timeout.cancel(timeoutId);
		});

		updateLater();
	}
})
app.directive("myCurrentTime1", function($timeout, dateFilter) {
	return {
		link: function(scope, element, attrs) {
			var format,
				timeoutId;

			function updateTime() {
				element.text(dateFilter(new Date(), format));
			}

			scope.$watch(attrs.myCurrentTime1, function(value) {
				format = value;
				updateTime();
			});

			function updateLater() {
				timeoutId = $timeout(function() {
					updateTime();
					updateLater();
				}, 1000);
			}

			element.bind('$destroy', function() {
				$timeout.cancel(timeoutId);
			});

			updateLater();
		}
	}
})