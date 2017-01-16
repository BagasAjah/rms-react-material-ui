import React, { Component } from 'react';
import {render} from 'react-dom';

import Header from "../component/common/Header"

import EmployeeToolbar from "../component/employee/EmployeeToolbar"
import EmployeeList from "../component/employee/EmployeeList"

import DummyData from "../dummy_data/sampleEmployeeData"

class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees : DummyData,
            currentEmployee: DummyData[0]
        };
    }

    setEmployees(employeesData) {
        this.setState({currentEmployee: employeesData});
    }

    render(){
        return(
            <div>
                <Header/>
                <EmployeeToolbar currentEmployee={this.state.currentEmployee}/>
                <EmployeeList employees={this.state.employees} setEmployees={this.setEmployees.bind(this)}/>
            </div>
        )
    }
}


export default EmployeeDetails;