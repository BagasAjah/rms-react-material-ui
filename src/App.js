import React, { Component } from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import storeFactory from './store'

import EmployeeDetails from "./component/containers/employee/EmployeeDetails"
import EmployeeToolbar from "./component/employee/EmployeeToolbar"
import EmployeeTab from "./component/employee/EmployeeTab"
import EmployeeTabDetails from "./component/employee/EmployeeTabDetails"
import EmployeeTabFamilyMember from "./component/employee/EmployeeTabFamilyMember"
import EmployeeTabGradeHistory from "./component/employee/EmployeeTabGradeHistory"
import EmployeeTabHistory from "./component/employee/EmployeeTabHistory"
import EmployeeTabAddress from "./component/employee/EmployeeTabAddress"
import EmployeeTabLocation from "./component/employee/EmployeeTabLocation"
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
        <Router history={hashHistory}>
            <Route path='/employee' component={EmployeeDetails}>
                <IndexRoute component={EmployeeToolbar}/>
                    <Route components={EmployeeTab}>
                        <IndexRoute component={EmployeeTabDetails}/>
                        <Route path='/employee/details' components={EmployeeTabDetails} />
                        <Route path='/employee/history' components={EmployeeTabHistory} />
                        <Route path='/employee/grade' components={EmployeeTabGradeHistory} />
                        <Route path='/employee/family' components={EmployeeTabFamilyMember} />
                        <Route path='/employee/address' components={EmployeeTabAddress} />
                        <Route path='/employee/location' components={EmployeeTabLocation} />
                    </Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'))
