import React, {Component} from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import ContentAdd from 'material-ui/svg-icons/content/add';

import EmployeeLocationDetail from "./EmployeeLocationDetail"
import lookupData from "../../dummy_data/lookupData"

import {handleEmployeeDetailsInfo} from "../lib/employee/employeeHelper"

const validationErrorMessage = "This field is required!";

class EmployeeTabLocation extends Component {
    constructor(props) {
        super(props);
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleOfficeLocationChanged = this.handleOfficeLocationChanged.bind(this);
        this.handleOfficeAddressChanged = this.handleOfficeAddressChanged.bind(this);
        this.addOfficeLocationClick = this.addOfficeLocationClick.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.updateClick = this.updateClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
    }

    handleDataChange = (index, value, type) => {
        var updatedEmployee = update(this.props.currentEmployee, {
            'location': {
                [index]: {
                    [type]: {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
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

    openDialogClick = () => {
        var updatedEmployee = update(this.props.newEmployee, {
            'location': {
                0: {
                    'officeStartDate':  {$set: null},
                    'officeEndDate': {$set: new Object},
                    'officeLocation': {$set: ''},
                    'officeAddress': {$set: ''}
                }
            }
        });
        this.props.handleStateChanged('newEmployee', updatedEmployee);
        this.props.handleStateChanged('selectedIndex', null);
        this.props.handleOpenDialogChanged('locationDialog', true);
        this.props.handleOpenValidationMessage('locationValidation', false);
    }

    closeDialogClick = () => {
        this.props.handleOpenDialogChanged('locationDialog', false);
    }

    addOfficeLocationClick = () => {
        var location = this.props.newEmployee.location[0];
        if(location.officeAddress == '' || location.officeLocation =='' || location.officeStartDate == null) {
            this.props.handleOpenValidationMessage('locationValidation', true);
        } else {
            var currentEmployee = this.props.currentEmployee;
            var updatedEmployee = update(currentEmployee, {'location': {
                $push: [{
                    officeStartDate: location.officeStartDate,
                    officeEndDate: location.officeEndDate,
                    officeLocation: location.officeLocation,
                    officeAddress: location.officeAddress
                }]
            }});
            this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
            this.closeDialogClick();
        }
    }

    updateClick = (index) => {
        this.props.handleStateChanged('selectedIndex', index);
    }

    deleteClick = (index) => {
        var updatedEmployee = update(this.props.currentEmployee, {'location': {$splice: [[index,1]]}});
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    render = () => {
        const actionsButton = [
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.addOfficeLocationClick}
            />
        ];
        var employeeLocationDetail = [];
        if (this.props.currentEmployee) {
            var locationList = this.props.currentEmployee.location;
            var lookupLocationMenuItem = lookupData.location.map(lookupLocation =>
                <MenuItem key= {lookupLocation.lookupCode} value={lookupLocation.lookupCode} primaryText={lookupLocation.lookupValue} />
            );
            employeeLocationDetail = locationList.map((locationList, locationIndex) => (
                <EmployeeLocationDetail
                    key={locationIndex}
                    index={locationIndex}
                    location={locationList}
                    viewMode={this.props.viewMode}
                    selectedIndex={this.props.selectedIndex}
                    handleDataChange={this.handleDataChange.bind(this)}
                    deleteClick={this.deleteClick.bind(this)}
                    updateClick={this.updateClick.bind(this)}/>
            ));

        }
        return (
            <div className="menu-content">
                <h2>Employee Location Details</h2>
                {(employeeLocationDetail.length == 0) ?
                    <div style={{textAlign: 'center'}}>Location Details Not Found</div>
                :
                    (<List >
                            {employeeLocationDetail}
                    </List>)
                }
                <FloatingActionButton className="btn-add-tab-position"
                    secondary={true}
                    onClick={this.openDialogClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    contentStyle={{width: '70%',maxWidth: 'none'}}
                    title="Office Location Details"
                    actions={actionsButton}
                    modal={false}
                    open={this.props.openDialog.locationDialog}
                    onRequestClose={this.closeDialogClick}>
                        <DatePicker
                            className='detail-dialog'
                            floatingLabelText="Office Start Date"
                            name="Office Start Date"
                            ref="a"
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
                </Dialog>
            </div>
        )
    }
}

export default EmployeeTabLocation;
