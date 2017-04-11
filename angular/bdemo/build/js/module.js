app.controller('injectorTest', injectorTest);

function injectorTest($scope, stateParams, http, util) {
	$scope.name = "injectorTest";
	util.log("injectorTest");
}
// injectorTest.$inject = ["$scope", "stateParams", "http", "util"];
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
app.directive("autoinput", function() {
	return {
		restrict: 'E',
		scope: {
			'test': '='
		},
		template: `
			<div class="autoinput-wrapper">
				<div class="autoinput">
					<input type="text" ng-model="key" ng-keyup="search()"/>
				</div>
				<div class="auto-result">
					<ul>
						<li ng-repeat="d in result">{{d.name}}</li>
					</ul>
				</div>
			</div>
		`,
		link: function(scope, elements, attrs) {
			scope.search = function() {
				scope.result = scope.test();
			};
		}
	}
})
app.service("http", function($http) {
	var index = 0;
	// 初始化只执行一次 返回的是一个单例
	console.log("http init " + (index++));
	this.ajax = function(o) {
		return $http.apply(this, arguments).success(function(ajaxData) {
			if (ajaxData.status == 200) {
				o.success && o.success(ajaxData);
			} else {
				o.error && o.error(ajaxData);
			}
		});
	}
})
app.directive("pop", function() {
	return {
		restrict: "E",
		controller: function($scope) {
			$scope.close = function() {
				alert("click dialog close");
			};
		},
		transclude: true,
		scope: {
			$close: "="
		},
		template: `<div class="dialog">
						<div class="dialog-title">{{title}}</div>
						<div class="dialog-close" ng-click="close()">dialog-close</div>
						<div class="dialog-content" ng-transclude></div>
					</div>`,
		link: function(scope, element, attrs) {
			scope.$close = scope.close;
		}
	}
})

app.provider("popup", function() {;
	this.$get = ["$compile", "$document", "$rootScope", "$controller", function($compile, $document, $rootScope, $controller) {
		var publicMethod = {
			close: function() {}
		}
		return {
			open: function(opts) {
				// 构造一个scope
				var scope = $rootScope.$new();
				angular.extend(scope, publicMethod);
				// 构造一个controller
				$controller(opts.controller, {
					$scope: scope
				});
				var $pop = $compile(opts.template)(scope);
				$document.find("body").append($pop);
			}
		};
	}]
})
app.factory("util", function() {
	return {
		log: function(text) {
			console.log(text);
		}
	}
})
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
		template:'<link rel="stylesheet" href="../modules/sidebar/sidebar.css"><div class="sidebar-wrapper" ng-controller="sidebarCtrl"><ul><li ng-repeat="d in navList" ng-class="{active: currentIndex == $index}"><a ng-click="clickNav(d,$index)" ui-sref="{{d.hash}}({id:{{d.id}}})">{{d.name}}</a></li></ul></div>',
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