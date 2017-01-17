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
            allEmployee: DummyData,
            employees : DummyData,
            currentEmployee: DummyData[0],
            filteredEmployees: [],
            filterMode: false
        };
    }

    setFilteringProps(filteredEmployees, filterMode) {
        this.setState({filteredEmployees: filteredEmployees});
        this.setState({filterMode: filterMode});
        if (this.state.filterMode) {
            this.setState({employees: this.state.filteredEmployees});
        } else {
            this.setState({employees: this.state.allEmployee});
        }
    }

    setEmployees(employeesData) {
        this.setState({currentEmployee: employeesData});
    }

    render(){
        return(
            <div>
                <Header/>
                <EmployeeToolbar
                    employees={this.state.employees}
                    currentEmployee={this.state.currentEmployee}
                    setFilteringProps={this.setFilteringProps.bind(this)}/>
                <EmployeeList employees={this.state.employees} setEmployees={this.setEmployees.bind(this)}/>
            </div>
        )
    }
}


export default EmployeeDetails;