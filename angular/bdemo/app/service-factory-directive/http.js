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