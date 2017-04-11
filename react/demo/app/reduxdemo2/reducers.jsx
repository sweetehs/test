import {
	combineReducers
} from "redux";

var list = (state = [], action) => {
	switch (action.type) {	
		case "add":
			return [
				...state, {
					text: action.text,
					isDone: false
				}
			]
		default:
			return state;
	}
}
export default combineReducers({
	list
})