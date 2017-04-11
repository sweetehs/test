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