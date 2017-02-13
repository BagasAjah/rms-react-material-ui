import React, { Component } from 'react';
import update from 'react-addons-update';

import {render} from 'react-dom';

import Header from "../component/common/Header"

import EmployeeToolbar from "../component/employee/EmployeeToolbar"
import EmployeeList from "../component/containers/employee/EmployeeList"

class EmployeeDetails extends Component {

    constructor(props) {
        super(props);
    }

    render = () => {
        return(
            <div>
                <Header/>
                <EmployeeToolbar />
                <EmployeeList />
            </div>
        )
    }
}

export default EmployeeDetails;