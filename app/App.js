import React, { Component } from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import EmployeeDetails from "./layout/EmployeeDetails"
import EmployeeToolbar from "./component/employee/EmployeeToolbar"
import EmployeeTab from "./component/employee/EmployeeTab"
import EmployeeTabDetails from "./component/employee/EmployeeTabDetails"
import EmployeeTabFamilyMember from "./component/employee/EmployeeTabFamilyMember"

injectTapEventPlugin();

/*class App extends Component {
  render(){
    return (
      <h1>Hello World</h1>
    );
  }
}*/

// Render the main app react component into the app div.
render((
    <Router history={hashHistory}>
        <Route path='/employee' component={EmployeeDetails}>
            <IndexRoute component={EmployeeToolbar}/>
                <Route components={EmployeeTab}>
                    <IndexRoute component={EmployeeTabDetails}/>
                    <Route path='/employee/details' components={EmployeeTabDetails} />
                    <Route path='/employee/family' components={EmployeeTabFamilyMember} />
                </Route>
        </Route>
    </Router>
), document.getElementById('root'))
