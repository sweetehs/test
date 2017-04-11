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