import "./css/reset.less";
import "./index.less";
import React from "react";
import { HashRouter as Router, Route } from 'react-router-dom'; //4.0 special
import ReactDom from "react-dom";
import List from "./List/List.jsx";
import Detail from "./Detail/Detail.jsx";
Date.prototype.Format = function(fmt) {
	var o = {
		"y+": this.getFullYear(),
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S+": this.getMilliseconds() //毫秒
	};
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			if (k == "y+") {
				fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
			} else if (k == "S+") {
				var lens = RegExp.$1.length;
				lens = lens == 1 ? 3 : lens;
				fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
			} else {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
	}
	return fmt;
}
class News extends React.Component{
	constructor(props) {
		super(props);		
	}	
	render(){
		return (
			<Router>
				<div className="main-wrapper">
					<Route exact path="/" component={List}></Route>
					<Route path="/detail/:id" component={Detail}></Route>
				</div>
			</Router>
		)
	}
}
ReactDom.render(<News />,document.getElementById('app'))