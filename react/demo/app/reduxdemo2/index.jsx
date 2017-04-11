import React from "react";
import reactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import todoReducer from "./reducers.jsx";
let store = createStore(todoReducer);
import App from "./App.jsx";


reactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app")
)