var Random = Mock.Random;
Random.extend({
	constellation: function(date) {
		var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
		return this.pick(constellations)
	}
})
Mock.mock('/list', {
	"status": 200,
	"list|100": [{
		'name': "@name",
		'age|1-100': 100,
		'email': '@email',
		'constellation': '@CONSTELLATION'
	}]
});