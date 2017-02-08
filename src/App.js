import React, { Component } from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import storeFactory from './store'

import RouterApp from "./router"
import sampleData from "./initialState"

injectTapEventPlugin();

/*class App extends Component {
  render(){
    return (
      <h1>Hello World</h1>
    );
  }
}*/
const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState())

const store = storeFactory(initialState)
store.subscribe(saveState)
// Render the main app react component into the app div.

render((
    <Provider store={store}>
        <RouterApp/>
    </Provider>
), document.getElementById('root'))
