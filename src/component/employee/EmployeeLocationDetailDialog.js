import React, { Component, PropTypes } from 'react';

import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import lookupData from "../../dummy_data/lookupData"

import {handleEmployeeDetailsInfo} from "../../lib/employee/employeeHelper"

const validationErrorMessage = "This field is required!"

class EmployeeLocationDetailDialog extends Component {

    constructor(props) {
        super(props);
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleOfficeLocationChanged = this.handleOfficeLocationChanged.bind(this);
        this.handleOfficeAddressChanged = this.handleOfficeAddressChanged.bind(this);
    }

    handleStartDateChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('location', 'officeStartDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleEndDateChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('location', 'officeEndDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleOfficeLocationChanged = (e, index, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('location', 'officeLocation', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleOfficeAddressChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('location', 'officeAddress', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    render = () => {
        var lookupLocationMenuItem = lookupData.location.map(lookupLocation =>
            <MenuItem key= {lookupLocation.lookupCode} value={lookupLocation.lookupCode} primaryText={lookupLocation.lookupValue} />
        );
        return(
            <div>
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="Office Start Date"
                    name="Office Start Date"
                    value={this.props.newEmployee.location[0].officeStartDate}
                    errorText={this.props.openValidationMessage.locationValidation && (this.props.newEmployee.location[0].officeStartDate==null)?validationErrorMessage:""}
                    onChange={(e, value) => this.handleStartDateChanged(e, value)}
                    autoOk={true} />
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="Office End Date"
                    value={this.props.newEmployee.location[0].officeEndDate}
                    onChange={(e, value) => this.handleEndDateChanged(e, value)}
                    autoOk={true} />
                <br />
                <SelectField
                    className='detail-dialog'
                    floatingLabelText="Office Location"
                    maxHeight={200}
                    value={this.props.newEmployee.location[0].officeLocation}
                    errorText={this.props.openValidationMessage.locationValidation && (this.props.newEmployee.location[0].officeLocation=='')?validationErrorMessage:""}
                    onChange={(e, index, value) => this.handleOfficeLocationChanged(e, index, value)}>
                    {lookupLocationMenuItem}
                </SelectField>
                <TextField
                    className='detail-dialog'
                    floatingLabelText="Office Address"
                    value={this.props.newEmployee.location[0].officeAddress}
                    errorText={this.props.openValidationMessage.locationValidation && (this.props.newEmployee.location[0].officeAddress=='')?validationErrorMessage:""}
                    onChange={(e, value) => this.handleOfficeAddressChanged(e, value)}
                    multiLine={true}
                    rows={2}
                    rowsMax={2}
                    underlineShow={false}/>
            </div>
        )
    }
}

EmployeeLocationDetailDialog.propTypes = {
    currentEmployee: PropTypes.object,
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeLocationDetailDialog;