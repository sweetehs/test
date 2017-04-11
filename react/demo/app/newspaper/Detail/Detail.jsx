import "./Detail.less";
import pubsub from "../util/publish.jsx";
import React from "react";
import Server from "../util/server.jsx";
import Immutable from "immutable"
export default class Detail extends React.Component{
	constructor(props) {
		super(props);
		let that = this,
			list = Server.getDataById(this.props.match.params.id).list;
	
		list = (!list || list.length == 0) ? [{
			name: "",
			works: [{
				descrition: ""
			}],
			nextWorks: [{
				descrition: ""
			}]
		}] : list
		that.state = {
			list: Immutable.fromJS(list)
		}
	}
	changeName(index, event) {
		this.setState({
			list: this.state.list.setIn([index, "name"], event.target.value)
		})
	}
	changeWoks(index1, index2, event) {
		this.setState({
			list: this.state.list.setIn([index1, "works", index2, "descrition"], event.target.value)
		})
	}
	changeNextWorks(index1, index2, event) {
		this.setState({
			list: this.state.list.setIn([index1, "nextWorks", index2, "descrition"], event.target.value)
		})
	}
	addOne(index){		
		this.setState({
			list: this.state.list.updateIn([index, "works"], (works) => {				
				return works.push(Immutable.fromJS({
					descrition: ""
				}))
			})
		})
	}
	addNextOne(index){
		this.setState({
			list: this.state.list.updateIn([index, "nextWorks"], (works) => {				
				return works.push(Immutable.fromJS({
					descrition: ""
				}))
			})
		})
	}
	add(){
		this.setState({
			list: this.state.list.push(Immutable.fromJS({
				name: "",
				works: [{
					descrition: ""
				}],
				nextWorks: [{
					descrition: ""
				}]
			}))
		})
	}
	submit(){
		let that = this;
		Server.saveDataById(this.props.match.params.id, this.state.list.toJS());
	}
	render(){
		return (<div className="detail-wrapper">
			{this.state.list.map((item,index1)=>
				<div className="detail-list-item" key={index1}>
					<div className="detail-item">
						<span className="text top">项目名称：</span>
						<div className="detail-item-content">
							<input type="text" value={item.get("name")} onChange={this.changeName.bind(this,index1)}/>
							<a onClick={this.add.bind(this,index1)}>增加</a>
						</div>
					</div>
					<div className="detail-item">
						<span className="text top">项目完成：</span>
						<div className="detail-item-content"><ul>
							{item.get("works").map((data,index2)=>
								<li key={index2}>
									<textarea type="text" value={data.get("descrition")} onChange={this.changeWoks.bind(this,index1,index2)}></textarea>
									{item.get("works").size == (index2+1) ? <a onClick={this.addOne.bind(this,index1)}>增加</a> : null}
								</li>
							)}
						</ul></div>
					</div>
					<div className="detail-item">
						<span className="text top">下周工作：</span>
						<div className="detail-item-content"><ul>
							{item.get("nextWorks").map((data,index2)=>
								<li key={index2}>
									<textarea type="text" value={data.get("descrition")} onChange={this.changeNextWorks.bind(this,index1,index2)}></textarea>
									{item.get("nextWorks").size == (index2+1) ? <a onClick={this.addNextOne.bind(this,index1)}>增加</a> : null}
								</li>
							)}
						</ul></div>
					</div>
				</div>
			)}
			<div>
				<a onClick={this.submit.bind(this)}>确认</a>
			</div>
		</div>)
	}
}