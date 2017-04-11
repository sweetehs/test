import React from "react";
import reactDOM from "react-dom";
import {connect} from "react-redux";

import ListAdd from "./components/ListAdd.jsx";
import List from "./components/List.jsx";
class App extends React.Component {
	render() {
		return (
			<div>
				<ListAdd onAdd={(text)=>this.props.dispatch({type:"add",text})}/>
				<List list={this.props.list} />
			</div>
		)
	}
}
export default connect((state)=>{
	return {
		list:state.list
	}
})(App);