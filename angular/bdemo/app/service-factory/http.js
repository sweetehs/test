app.service("http", function($http) {
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