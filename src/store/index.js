import C from '../constants'
import appReducer from './employeeReducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	result = next(action)

	console.log(`

		result

	`)

	console.groupEnd()

	return result
}


export default (initialState={}) => {
	return applyMiddleware(consoleMessages, thunk)(createStore)(appReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}



