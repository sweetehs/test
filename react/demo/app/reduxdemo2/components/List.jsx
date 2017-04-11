import React from "react";
import reactDOM from "react-dom";
export default class List extends React.Component{
	render(){
		return (
			<ul>
				{this.props.list.map((d,index)=>{
					return <li key={index}>{d.text}</li>
				})}
			</ul>
		)
	}
}