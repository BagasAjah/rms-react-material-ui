import C from '../constants'
import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	result = next(action)

	console.log(`

		after

	`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(consoleMessages)(createStore)(appReducer, initialState)
}



