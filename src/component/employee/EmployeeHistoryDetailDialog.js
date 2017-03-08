import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {handleEmployeeDetailsInfo, isEmpty} from "../../lib/employee/employeeHelper"

const validationErrorMessage = "This field is required!";

class EmployeeHistoryDetailDialog extends Component {
    constructor(props) {
        super(props);
        this.addNewHistoryJobDesc = this.addNewHistoryJobDesc.bind(this);
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleCompanyChanged = this.handleCompanyChanged.bind(this);
        this.handlePositionChanged = this.handlePositionChanged.bind(this);
        this.handleJobDescChanged = this.handleJobDescChanged.bind(this);
        this.handleToggleChanged = this.handleToggleChanged.bind(this);
        this.showErrorMessage = this.showErrorMessage.bind(this);
    }

    handleStartDateChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'historyStartDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleEndDateChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'historyEndDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleCompanyChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'company', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handlePositionChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'position', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleJobDescChanged = (e, value, index) => {
        var updatedJobDesc = update(this.props.newEmployee.history[0].jobDesc, {
            [index]: {
                $set: value
            }
        });
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'jobDesc', updatedJobDesc, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    addNewHistoryJobDesc = () => {
        var updatedJobDesc = update(this.props.newEmployee.history[0].jobDesc, {$push: ['']});
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'jobDesc', updatedJobDesc, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleToggleChanged = (e, isInputChecked) => {
        this.props.handleToggleChanged('enableHistoryToggle', isInputChecked);
    }

    showErrorMessage = (validator, fieldValue, toggle) => {
        if (validator && isEmpty(fieldValue) && toggle) {
            return validationErrorMessage;
        } else {
            return '';
        }
    }

    render = () => {
        var jobDescList = this.props.newEmployee.history[0].jobDesc;
        var jobDescListRender = jobDescList.map((jobDescList, index) => (
            <div style={{width:'100%'}} key={index}>
                <TextField
                    floatingLabelText="Job Description"
                    value={jobDescList}
                    onChange={(e, value) => this.handleJobDescChanged(e, value, index)}
                    underlineShow={true}/>
            </div>
        ));
        return(
            <div>
                <Toggle
                  label="Enable History"
                  defaultToggled={true}
                  className='toggle-position'
                  onToggle={(e, isInputChecked) => this.handleToggleChanged(e, isInputChecked)}
                />
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="History Start Date"
                    disabled={!this.props.enableToggle.enableHistoryToggle}
                    value={this.props.enableToggle.enableHistoryToggle ? this.props.newEmployee.history[0].historyStartDate : ''}
                    onChange={(e, value) => this.handleStartDateChanged(e, value)}
                    errorText={this.showErrorMessage(
                        this.props.openValidationMessage.historyValidation, this.props.newEmployee.history[0].historyStartDate, this.props.enableToggle.enableHistoryToggle
                    )}
                    autoOk={true} />
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="History End Date"
                    disabled={!this.props.enableToggle.enableHistoryToggle}
                    value={this.props.enableToggle.enableHistoryToggle ? this.props.newEmployee.history[0].historyEndDate : ''}
                    onChange={(e, value) => this.handleEndDateChanged(e, value)}
                    autoOk={true} />
                <TextField
                    className='detail-dialog'
                    floatingLabelText="Company Name"
                    disabled={!this.props.enableToggle.enableHistoryToggle}
                    value={this.props.enableToggle.enableHistoryToggle ? this.props.newEmployee.history[0].company : ''}
                    onChange={(e, value) => this.handleCompanyChanged(e, value)}
                    errorText={this.showErrorMessage(
                        this.props.openValidationMessage.historyValidation, this.props.newEmployee.history[0].company, this.props.enableToggle.enableHistoryToggle
                    )}
                    underlineShow={true}/>
                <TextField
                    className='detail-dialog'
                    style={{paddingLeft:10}}
                    floatingLabelText="Position"
                    disabled={!this.props.enableToggle.enableHistoryToggle}
                    value={this.props.enableToggle.enableHistoryToggle ? this.props.newEmployee.history[0].position : ''}
                    onChange={(e, value) => this.handlePositionChanged(e, value)}
                    errorText={this.showErrorMessage(
                        this.props.openValidationMessage.historyValidation, this.props.newEmployee.history[0].position, this.props.enableToggle.enableHistoryToggle
                    )}
                    underlineShow={true}/><br />
                <div className="detail-dialog" style={{width:'100%'}}>
                    <div className="detail-dialog" style={{paddingLeft:0}}>Job Description</div>
                    <div className="detail-dialog" style={{paddingLeft:10}}>
                        <ActionAdd
                            onClick={this.addNewHistoryJobDesc}
                            disabled={!this.props.enableToggle.enableHistoryToggle}/>
                    </div>
                </div>
                <div className="detail-dialog" style={{width:'100%'}}>
                    {(jobDescListRender.length>0 && this.props.enableToggle.enableHistoryToggle)? jobDescListRender : ''}
                </div>
            </div>
        )
    }
}

EmployeeHistoryDetailDialog.propTypes = {
    currentEmployee: PropTypes.object,
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeHistoryDetailDialog;
