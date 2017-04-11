import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import Counter from './Counter.jsx'
import reducer from './Reducer.jsx'

const store = createStore(reducer, applyMiddleware(thunk))
class ReduxMain extends React.Component{
	ajaxGet(){
		return new Promise((resolve,reject)=>
			setTimeout(()=>resolve(1000),0)
		)
	}
	actionOnincrement(){
		var that = this;	
		store.dispatch((dispatch)=>{
			return that.ajaxGet().then((x)=>{
				// 可以通过action传递参数
				dispatch({ type: 'INCREMENT',state:x })
			})
		})
	}
	render(){
		return ( <Counter
		    value={store.getState()}
		    onIncrement={() => this.actionOnincrement()}
		    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
		  />);
	}
}
const render = ()=> ReactDOM.render( <ReduxMain/>,document.getElementById('app'));

render();
store.subscribe(render)