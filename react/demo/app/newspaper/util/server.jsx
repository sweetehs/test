import LocalDb from "localDb";
class server {
	constructor() {
		this.db = new LocalDb('zhoubao');
	}
	getAll() {
		// this.db.set("list", []);
		return this.db.get("list") || []
	}
	getDataById(id) {
		var list = this.getAll(),
			cData = "";
		list.forEach((data, i) => {
			if (data.id == id) {
				cData = data;
			}
		});
		return cData;
	}
	saveDataById(id, data) {
		var list = this.getAll();
		list = list.map((_data, i) => {
			if (_data.id == id) {
				_data.list = data
			}
			return _data;
		});
		this.db.set("list", list);
	}
	addData(data) {
		// 保存一条数据
		var list = this.getAll();
		list.push(data);
		this.db.set("list", list);
	}
	saveData(data){
		this.db.set("list", data);
	}
}
export default new server();