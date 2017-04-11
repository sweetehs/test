var log = (x) => {
	console.log(x);
}
var middleWare = (...marr) => {
	marr.forEach((m) => {
		log = m(log);
	})
	return log;
}
var m1 = (next) => {
	return function(x) {
		console.log("m1 start");
		next(x);
		console.log("m1 end");
	}
};
// es6 柯里化
var m2 = next => x => {
	console.log("m2 start");
	var n = next(x);
	console.log("m2 end");
};
// 感觉用处挺大的
var test = middleWare(m1, m2);
test("main");