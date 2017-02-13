import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import ActionAccountBox from 'material-ui/svg-icons/action/account-box';

import lookupData from "../../dummy_data/lookupData"

class EmployeeTabDetails extends Component {

    constructor(props) {
        super(props);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleNationalityChange = this.handleNationalityChange.bind(this);
        this.handleMaritalStatusChange = this.handleMaritalStatusChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubDivisionChange = this.handleSubDivisionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSuspendDateChange = this.handleSuspendDateChange.bind(this);
        this.handleHireDateChange = this.handleHireDateChange.bind(this);
        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.handleDivisionChange = this.handleDivisionChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.setSavedEmployee = this.setSavedEmployee.bind(this);
    }

    handleFirstNameChange = () => {
        var employee = update(this.props.currentEmployee, {'firstName': {$set: this.firstNameInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleLastNameChange = () => {
        var employee = update(this.props.currentEmployee, {'lastName': {$set: this.lastNameInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleGenderChange = (event, index, value) => {
        var employee = update(this.props.currentEmployee, {'gender': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleDobChange = (e, value) => {
        var employee = update(this.props.currentEmployee, {'dob': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleNationalityChange = () => {
        var employee = update(this.props.currentEmployee, {'nationality': {$set: this.nationalityInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleMaritalStatusChange = (e, index, value) => {
        var employee = update(this.props.currentEmployee, {'maritalStatus': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handlePhoneChange = () => {
        var employee = update(this.props.currentEmployee, {'phone': {$set: this.phoneInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleSubDivisionChange = () => {
        var employee = update(this.props.currentEmployee, {'subDivision': {$set: this.subDivisionInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleStatusChange = (e, index, value) => {
        var employee = update(this.props.currentEmployee, {'status': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleSuspendDateChange = (e, value) => {
        var employee = update(this.props.currentEmployee, {'suspendDate': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleHireDateChange = (e, value) => {
        var employee = update(this.props.currentEmployee, {'hireDate': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleGradeChange = (e, index, value) => {
        var employee = update(this.props.currentEmployee, {'grade': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleDivisionChange = (e, index, value) => {
        var employee = update(this.props.currentEmployee, {'division': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleEmailChange = () => {
        var employee = update(this.props.currentEmployee, {'email': {$set: this.emailInput.input.value}});
        this.setSavedEmployee(employee);
    }

    setSavedEmployee = (employee) => {
        this.props.setSavedEmployee(employee, this.props.pageMode);
    }

    render = () => {
        var lookupGenderMenuItem = lookupData.gender.map(lookupGender =>
            <MenuItem key= {lookupGender.lookupCode} value={lookupGender.lookupCode} primaryText={lookupGender.lookupValue} />
        );
        var lookupMaritalStatusMenuItem = lookupData.statusMarital.map(lookupMaritalStatus =>
            <MenuItem key= {lookupMaritalStatus.lookupCode} value={lookupMaritalStatus.lookupCode} primaryText={lookupMaritalStatus.lookupValue} />
        );
        var lookupStatusMenuItem = lookupData.status.map(lookupStatus =>
            <MenuItem key= {lookupStatus.lookupCode} value={lookupStatus.lookupCode} primaryText={lookupStatus.lookupValue} />
        );
        var lookupGradeMenuItem = lookupData.grade.map(lookupGrade =>
            <MenuItem key= {lookupGrade.lookupCode} value={lookupGrade.lookupCode} primaryText={lookupGrade.lookupValue} />
        );
        var lookupDivisionMenuItem = lookupData.division.map(lookupDivision =>
            <MenuItem key= {lookupDivision.lookupCode} value={lookupDivision.lookupCode} primaryText={lookupDivision.lookupValue} />
        );
        return(
        <div className="menu-content">
            <h2>Employee Details</h2>
            <div className="content">
                <input type="hidden" id="employeeId"/>
                <TextField
                    floatingLabelText="First Name"
                    ref={(input) => this.firstNameInput = input}
                    onChange={this.handleFirstNameChange}
                    value={this.props.currentEmployee ? this.props.currentEmployee.firstName : ''}
                    disabled={this.props.viewMode}
                /><br />
                <TextField
                    floatingLabelText="Last Name"
                    ref={(input) => this.lastNameInput = input}
                    onChange={this.handleLastNameChange}
                    value={this.props.currentEmployee ? this.props.currentEmployee.lastName : ''}
                    disabled={this.props.viewMode}
                /><br />
                <SelectField
                    floatingLabelText="Gender"
                    value={this.props.currentEmployee ? this.props.currentEmployee.gender : ''}
                    onChange={(e, i, value) => this.handleGenderChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupGenderMenuItem}
                </SelectField><br />
                <DatePicker
                    floatingLabelText="Date of Birth"
                    value={this.props.currentEmployee ? this.props.currentEmployee.dob : new Object}
                    onChange={(e, value) => this.handleDobChange(e, value)}
                    autoOk={true}
                    disabled={this.props.viewMode}
                />
                <TextField
                    floatingLabelText="Nationality"
                    ref={(input) => this.nationalityInput = input}
                    value={this.props.currentEmployee ? this.props.currentEmployee.nationality : ''}
                    onChange={this.handleNationalityChange}
                    disabled={this.props.viewMode}
                /><br />
                <SelectField
                    floatingLabelText="Marital Status"
                    value={this.props.currentEmployee ? this.props.currentEmployee.maritalStatus : ''}
                    onChange={(e, i, value) => this.handleMaritalStatusChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupMaritalStatusMenuItem}
                </SelectField><br />
                <TextField
                    floatingLabelText="Phone"
                    ref={(input) => this.phoneInput = input}
                    value={this.props.currentEmployee ? this.props.currentEmployee.phone : ''}
                    onChange={this.handlePhoneChange}
                    disabled={this.props.viewMode}
                /><br />
            </div>
            <div className="content">
                <TextField
                    floatingLabelText="Sub Division"
                    ref={(input) => this.subDivisionInput = input}
                    value={this.props.currentEmployee ? this.props.currentEmployee.subDivision : ''}
                    onChange={this.handleSubDivisionChange}
                    disabled={this.props.viewMode}
                /><br />
                <SelectField
                    floatingLabelText="Status"
                    value={this.props.currentEmployee ? this.props.currentEmployee.status : ''}
                    onChange={(e,i, value) => this.handleStatusChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupStatusMenuItem}
                </SelectField><br />
                <DatePicker
                    floatingLabelText="Suspend Date"
                    value={this.props.currentEmployee ? this.props.currentEmployee.suspendDate : new Object}
                    onChange={(e, value) => this.handleSuspendDateChange(e, value)}
                    autoOk={true}
                    disabled={this.props.viewMode}
                />
                <DatePicker
                    floatingLabelText="Hire Date"
                    value={this.props.currentEmployee ? this.props.currentEmployee.hireDate : new Object}
                    onChange={(e, value) => this.handleHireDateChange(e, value)}
                    autoOk={true}
                    disabled={this.props.viewMode}
                />
                <SelectField
                    floatingLabelText="Grade"
                    maxHeight={200}
                    value={this.props.currentEmployee ? this.props.currentEmployee.grade : ''}
                    onChange={(e, i, value) => this.handleGradeChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupGradeMenuItem}
                </SelectField><br />
                <SelectField
                    floatingLabelText="Division"
                    value={this.props.currentEmployee ? this.props.currentEmployee.division : ''}
                    onChange={(e, i, value) => this.handleDivisionChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupDivisionMenuItem}
                </SelectField><br />
                <TextField
                    floatingLabelText="Email"
                    ref={(input) => this.emailInput = input}
                    value={this.props.currentEmployee ? this.props.currentEmployee.email : ''}
                    onChange={this.handleEmailChange}
                    disabled={this.props.viewMode}
                /><br />
            </div>
            <div className="content">
                <Avatar
                  src={require("../../images/BagasDimas.jpg")}
                  size={100}
                />
            </div>
        </div>
        )
    }
}

EmployeeTabDetails.propTypes = {
    currentEmployee: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    viewMode: PropTypes.bool,
    setSavedEmployee: PropTypes.func
}

export default EmployeeTabDetails;