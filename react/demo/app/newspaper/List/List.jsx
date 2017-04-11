import "./List.less";
import React from "react";
import {Link} from 'react-router-dom';
import Server from "../util/server.jsx";
import Immutable from "immutable";
class Item extends React.Component{
	constructor(props) {
		super(props);		
	}
	eventDelete(){
		this.props.eventDelete(this.props.index);
	}
	render(){
		let itemdata = this.props.itemdata;
		return(
			<li className="list-item">
				<Link to={'/detail/'+itemdata.get("id")}>{itemdata.get("time")}</Link>
				<a className="btn-delete" href="javascript:;" onClick={this.eventDelete.bind(this)}>删除</a>
			</li>
		)
	}
}
export default class List extends React.Component{
	constructor(props) {		
		super(props);
		this.state = {
			i_ajaxDataList :Immutable.fromJS(Server.getAll())
		}
	}
	getWeekDate(){
		var today = new Date(),
			day = today.getDay();
		var to = new Date(today.setDate(today.getDate() - day + 1)),
			from = new Date(today.setDate(today.getDate() + (5 - day)));
		return {
			from: from.Format("yyyy-MM-dd"),
			to: to.Format("yyyy-MM-dd")
		}
	}	
	eventAdd(){
		var weekDate = this.getWeekDate(),
			id = weekDate.to + "-" + weekDate.from,
			cData = Server.getDataById(id);
		if (!cData) {
			Server.addData({
				id: id,
				name: "",
				time: weekDate.to + "至" + weekDate.from,
				list: []
			});
			this.setState({
				i_ajaxDataList: Immutable.fromJS(Server.getAll())
			})
		}
	}
	eventDelete(index){
		var i_ajaxDataList = this.state.i_ajaxDataList.delete(index),
			ajaxDataList = i_ajaxDataList.toJS();
		Server.saveData(ajaxDataList);
		this.setState({
			i_ajaxDataList
		})
	}
	render(){
		return (<div>
			<div className="list-action">
				<a onClick={this.eventAdd.bind(this)}>增加</a>
			</div>
			<div className="list-table">
				<ul>
					{this.state.i_ajaxDataList.map((data,index)=>
						<Item itemdata={data} key={index} eventDelete={this.eventDelete.bind(this)} index={index}/>
					)}
				</ul>
			</div>
		</div>);
	}
}