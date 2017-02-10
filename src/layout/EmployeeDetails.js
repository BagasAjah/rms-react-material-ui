import React, { Component } from 'react';
import update from 'react-addons-update';

import {render} from 'react-dom';

import Header from "../component/common/Header"

import EmployeeToolbar from "../component/employee/EmployeeToolbar"
import EmployeeList from "../component/containers/employee/EmployeeList"

import initialState from "../initialState"
import {searchEmployee, setDefaultEmployee} from "../component/lib/employee/employeeHelper"

class EmployeeDetails extends Component {
    state = initialState

    constructor(props) {
        super(props);
        this.setSearchingTextProps = this.setSearchingTextProps.bind(this);
    }

    setSearchingTextProps = (value) => this.setState({searchingText: value})

    setFilteringProps = (searchingText) => {
        this.setSearchingTextProps(searchingText);
        var employees = searchEmployee(this.state.allEmployee, searchingText);
        this.setState({
            employees: employees,
            editedEmployee: employees[0]
        });
    }

    setEmployees = (employeesData) => {
        this.setState({
            currentEmployee: employeesData,
            editedEmployee: employeesData,
            selectedIndex: null,
            viewMode: true
        });
    }

    handleStateChanged = (type, value) => {
        this.setState({[type]:  value});
    }

    handleOpenDialogChanged = (type, value) => {
        var updatedOpenDialog = update(this.state.openDialog, {
            [type] : {$set: value}
        });
        this.handleStateChanged('openDialog', updatedOpenDialog);
    }

    handleOpenValidationMessage = (type, value) => {
        var updatedOpenValidation = update(this.state.openValidationMessage, {
            [type] : {$set: value}
        });
        this.handleStateChanged('openValidationMessage', updatedOpenValidation);
    }

    render = () => {
        return(
            <div>
                <Header/>
                <EmployeeToolbar
                    employees={this.state.employees}
                    currentEmployee={this.state.currentEmployee}
                    currentTabLocation={this.state.currentTabLocation}
                    editedEmployee={this.state.editedEmployee}
                    newEmployee={this.state.newEmployee}
                    openDialog={this.state.openDialog}
                    openValidationMessage={this.state.openValidationMessage}
                    searchingText={this.state.searchingText}
                    selectedJobDescIndex={this.state.selectedJobDescIndex}
                    selectedIndex={this.state.selectedIndex}
                    viewMode={this.state.viewMode}
                    setFilteringProps={this.setFilteringProps.bind(this)}
                    handleOpenDialogChanged={this.handleOpenDialogChanged.bind(this)}
                    handleOpenValidationMessage={this.handleOpenValidationMessage.bind(this)}
                    handleStateChanged={this.handleStateChanged.bind(this)}/>
                <EmployeeList />
            </div>
        )
    }
}

export default EmployeeDetails;