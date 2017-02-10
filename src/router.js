import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import EmployeeDetails from "./component/containers/employee/EmployeeDetails"
import EmployeeToolbar from "./component/employee/EmployeeToolbar"
import EmployeeTab from "./component/containers/employee/EmployeeTab"
import EmployeeTabDetails from "./component/containers/employee/EmployeeTabDetails"
import EmployeeTabFamilyMember from "./component/employee/EmployeeTabFamilyMember"
import EmployeeTabGradeHistory from "./component/employee/EmployeeTabGradeHistory"
import EmployeeTabHistory from "./component/containers/employee/EmployeeTabHistory"
import EmployeeTabAddress from "./component/employee/EmployeeTabAddress"
import EmployeeTabLocation from "./component/employee/EmployeeTabLocation"

class RouterApp extends Component {
    render(){
        return(
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
        )
    }
}

export default RouterApp;