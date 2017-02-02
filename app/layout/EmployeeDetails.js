import React, { Component } from 'react';
import update from 'react-addons-update';

import {render} from 'react-dom';

import Header from "../component/common/Header"

import EmployeeToolbar from "../component/employee/EmployeeToolbar"
import EmployeeList from "../component/employee/EmployeeList"

import DummyData from "../dummy_data/sampleEmployeeData"
import {searchEmployee, setDefaultEmployee} from "../component/lib/employee/employeeHelper"

class EmployeeDetails extends Component {
    state = {
        allEmployee: DummyData,
        employees : DummyData,
        currentEmployee: DummyData[0],
        currentTabLocation: '',
        editedEmployee: DummyData[0],
        newEmployee: setDefaultEmployee(),
        openDialog: {
            gradeDialog: false,
            historyDialog: false,
            locationDialog: false,
        },
        openValidationMessage: {
            gradeValidation: false,
            locationValidation: false,
        },
        searchingText: '',
        selectedJobDescIndex: null,
        selectedIndex: null,
        viewMode: true
    }

    constructor(props) {
        super(props);
        this.addEmployeeList = this.addEmployeeList.bind(this);
        this.updateEmployeeList = this.updateEmployeeList.bind(this);
        this.deleteCurrentEmployee = this.deleteCurrentEmployee.bind(this);
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

    addCurrentEmployee = (newEmployee) => {
        this.setState({
            allEmployee: this.addEmployeeList(newEmployee, this.state.allEmployee),
            employees: this.addEmployeeList(newEmployee, this.state.employees),
            currentEmployee: newEmployee
        });
    }

    updateCurrentEmployee = (updatedEmployee) => {
        this.setState({
            allEmployee: this.updateEmployeeList(updatedEmployee, this.state.allEmployee),
            employees: this.updateEmployeeList(updatedEmployee, this.state.employees),
            currentEmployee: updatedEmployee
        });
    }

    deleteCurrentEmployee = (deletedEmployee) => {
        this.setState({
            allEmployee: this.deleteEmployeeOnList(deletedEmployee, this.state.allEmployee),
            employees: this.deleteEmployeeOnList(deletedEmployee, this.state.employees),
            currentEmployee: this.deleteEmployeeOnList(deletedEmployee, this.state.allEmployee)[0],
            editedEmployee: this.deleteEmployeeOnList(deletedEmployee, this.state.allEmployee)[0]
        });
    }

    addEmployeeList = (employee, employees) => {
        var newEmployee = update(employees, {$push:[employee]});
        return newEmployee;
    }

    updateEmployeeList = (employee, employees) => {
        var newEmployeeList = [];
        for(var i=0; i< employees.length; i++){
            if(employees[i].id == employee.id){
                newEmployeeList.push(employee);
            } else {
                newEmployeeList.push(employees[i]);
            }
        }
        return newEmployeeList;
    }

    deleteEmployeeOnList = (employee, employees) => {
        var newEmployeeList = [];
        for(var i=0; i< employees.length; i++){
            if(employees[i].id != employee.id){
                newEmployeeList.push(employees[i]);
            }
        }
        return newEmployeeList;
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
                    updateCurrentEmployee={this.updateCurrentEmployee.bind(this)}
                    deleteCurrentEmployee={this.deleteCurrentEmployee.bind(this)}
                    handleOpenDialogChanged={this.handleOpenDialogChanged.bind(this)}
                    handleOpenValidationMessage={this.handleOpenValidationMessage.bind(this)}
                    handleStateChanged={this.handleStateChanged.bind(this)}/>
                <EmployeeList
                    employees={this.state.employees}
                    setEmployees={this.setEmployees.bind(this)}
                    addCurrentEmployee={this.addCurrentEmployee.bind(this)}/>
            </div>
        )
    }
}

export default EmployeeDetails;