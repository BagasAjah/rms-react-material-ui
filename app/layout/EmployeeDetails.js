import React, { Component } from 'react';
import update from 'react-addons-update';

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
        this.addEmployeeList = this.addEmployeeList.bind(this);
        this.updateEmployeeList = this.updateEmployeeList.bind(this);
        this.deleteCurrentEmployee = this.deleteCurrentEmployee.bind(this);
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

    addCurrentEmployee(newEmployee){
        this.setState({
            allEmployee: this.addEmployeeList(newEmployee, this.state.allEmployee),
            employees: this.addEmployeeList(newEmployee, this.state.employees),
            currentEmployee: newEmployee
        });
    }

    updateCurrentEmployee(updatedEmployee){
        this.setState({
            allEmployee: this.updateEmployeeList(updatedEmployee, this.state.allEmployee),
            employees: this.updateEmployeeList(updatedEmployee, this.state.employees),
            currentEmployee: updatedEmployee
        });
    }

    deleteCurrentEmployee(deletedEmployee){
        this.setState({
            allEmployee: this.deleteEmployeeOnList(deletedEmployee, this.state.allEmployee),
            employees: this.deleteEmployeeOnList(deletedEmployee, this.state.employees),
            currentEmployee: this.deleteEmployeeOnList(deletedEmployee, this.state.allEmployee)[0]
        });
    }

    addEmployeeList(employee, employees){
        var newEmployee = update(employees, {$push:[employee]});
        return newEmployee;
    }

    updateEmployeeList(employee, employees){
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

    deleteEmployeeOnList(employee, employees){
        var newEmployeeList = [];
        for(var i=0; i< employees.length; i++){
            if(employees[i].id != employee.id){
                newEmployeeList.push(employees[i]);
            }
        }
        return newEmployeeList;
    }

    render(){
        return(
            <div>
                <Header/>
                <EmployeeToolbar
                    employees={this.state.employees}
                    currentEmployee={this.state.currentEmployee}
                    setFilteringProps={this.setFilteringProps.bind(this)}
                    updateCurrentEmployee={this.updateCurrentEmployee.bind(this)}
                    deleteCurrentEmployee={this.deleteCurrentEmployee.bind(this)}/>
                <EmployeeList
                    employees={this.state.employees}
                    setEmployees={this.setEmployees.bind(this)}
                    addCurrentEmployee={this.addCurrentEmployee.bind(this)}/>
            </div>
        )
    }
}


export default EmployeeDetails;