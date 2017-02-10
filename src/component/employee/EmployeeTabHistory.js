import React, {Component} from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';

import EmployeeHistoryDetail from "../containers/employee/EmployeeHistoryDetail"

import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {handleEmployeeDetailsInfo} from "../../lib/employee/employeeHelper"

class EmployeeTabHistory extends Component {
    constructor(props) {
        super(props);
        this.addNewHistory = this.addNewHistory.bind(this);
        this.addNewHistoryJobDesc = this.addNewHistoryJobDesc.bind(this);
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleCompanyChanged = this.handleCompanyChanged.bind(this);
        this.handlePositionChanged = this.handlePositionChanged.bind(this);
        this.handleJobDescChanged = this.handleJobDescChanged.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
    }

    openDialogClick = () => {
        var updatedEmployee = update(this.props.newEmployee, {
            'history': {
                0: {
                    'historyStartDate':  {$set: new Object},
                    'historyEndDate': {$set: new Object},
                    'company': {$set: ''},
                    'position': {$set: ''},
                    'jobDesc': {$set: []}
                }
            }
        });
        this.props.handleOpenDialogChanged('historyDialog', true);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    closeDialogClick = () => {
        this.props.handleOpenDialogChanged('historyDialog', false);
    }

    addNewHistoryJobDesc = () => {
        var updatedJobDesc = update(this.props.newEmployee.history[0].jobDesc, {$push: [['']]});
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'jobDesc', updatedJobDesc, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
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

    addNewHistory = () => {
        var updatedEmployee = update(this.props.currentEmployee, {
            'history': {
                $push: [{
                    historyStartDate: this.props.newEmployee.history[0].historyStartDate,
                    historyEndDate: this.props.newEmployee.history[0].historyEndDate,
                    company: this.props.newEmployee.history[0].company,
                    position: this.props.newEmployee.history[0].position,
                    jobDesc: this.props.newEmployee.history[0].jobDesc
                }]
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
        this.props.handleOpenDialogChanged('historyDialog', false);
    }

    render = () => {
        const actionsButton = [
            <FlatButton
                label="Add"
                primary={true}
                onClick={this.addNewHistory}
            />
        ];
        var employeeHistoryDetail = [];
        if (this.props.currentEmployee) {
            var historyList = this.props.currentEmployee.history;
            employeeHistoryDetail = historyList.map((historyList, historyIndex) => (
                <EmployeeHistoryDetail
                    key={historyIndex}
                    index={historyIndex}
                    history={historyList}
                    currentEmployee={this.props.currentEmployee}
                    pageMode={this.props.pageMode}/>
            ));
        }
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
            <div className="menu-content">
                <h2>Employee History Details</h2>
                {(employeeHistoryDetail.length == 0) ?
                    <div style={{textAlign: 'center'}}>History Details Not Found</div>
                :
                    (<List >
                            {employeeHistoryDetail}
                    </List>)
                }
                <FloatingActionButton className="btn-add-tab-position"
                    secondary={true}
                    onClick={this.openDialogClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    contentStyle={{width: '65%',maxWidth: 'none'}}
                    title="Employee History Details"
                    actions={actionsButton}
                    modal={false}
                    open={this.props.openDialog.historyDialog}
                    autoScrollBodyContent={true}
                    onRequestClose={this.closeDialogClick}>
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
                </Dialog>
            </div>
        )
    }
}

export default EmployeeTabHistory;