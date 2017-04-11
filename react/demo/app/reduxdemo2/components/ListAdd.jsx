import React from "react";
import reactDOM from "react-dom";

class ListAdd extends React.Component {
	add(){
		const node = this.refs.input
	    const text = node.value.trim()
	    this.props.onAdd(text);
	    node.value = ''		
	}
	render() {
		return (
			<div>
				<input type='text' ref='input'/><button onClick={()=>this.add()}>增加</button>
			</div>
		)
	}
}
ListAdd.propTypes = {
	onAdd:React.PropTypes.func.isRequired
}
export default ListAdd;