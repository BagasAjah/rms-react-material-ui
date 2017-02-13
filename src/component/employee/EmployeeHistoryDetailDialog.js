import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {handleEmployeeDetailsInfo} from "../../lib/employee/employeeHelper"

class EmployeeHistoryDetailDialog extends Component {
    constructor(props) {
        super(props);
        this.addNewHistoryJobDesc = this.addNewHistoryJobDesc.bind(this);
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleCompanyChanged = this.handleCompanyChanged.bind(this);
        this.handlePositionChanged = this.handlePositionChanged.bind(this);
        this.handleJobDescChanged = this.handleJobDescChanged.bind(this);
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
        var updatedJobDesc = update(this.props.newEmployee.history[0].jobDesc, {$push: [['']]});
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'jobDesc', updatedJobDesc, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
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
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="History Start Date"
                    value={this.props.newEmployee.history[0].historyStartDate}
                    onChange={(e, value) => this.handleStartDateChanged(e, value)}
                    autoOk={true} />
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="History End Date"
                    value={this.props.newEmployee.history[0].historyEndDate}
                    onChange={(e, value) => this.handleEndDateChanged(e, value)}
                    autoOk={true} />
                <TextField
                    className='detail-dialog'
                    floatingLabelText="Company Name"
                    value={this.props.newEmployee.history[0].company}
                    onChange={(e, value) => this.handleCompanyChanged(e, value)}
                    underlineShow={true}/>
                <TextField
                    className='detail-dialog'
                    style={{paddingLeft:10}}
                    floatingLabelText="Position"
                    value={this.props.newEmployee.history[0].position}
                    onChange={(e, value) => this.handlePositionChanged(e, value)}
                    underlineShow={true}/><br />
                <div className="detail-dialog" style={{width:'100%'}}>
                    <div className="detail-dialog" style={{paddingLeft:0}}>Job Description</div>
                    <div className="detail-dialog" style={{paddingLeft:10}}>
                        <ActionAdd onClick={this.addNewHistoryJobDesc}/>
                    </div>
                </div>
                <div className="detail-dialog" style={{width:'100%'}}>
                    {(jobDescListRender.length>0)? jobDescListRender : ''}
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
