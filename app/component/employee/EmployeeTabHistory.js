import React, {Component} from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';

import EmployeeHistoryDetail from "./EmployeeHistoryDetail"

import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import ContentAdd from 'material-ui/svg-icons/content/add';

class EmployeeTabHistory extends Component {
    constructor(props) {
        super(props);
        this.state={
            historyStartDate: new Object,
            historyEndDate: new Object,
            company: '',
            position: '',
            jobDesc: [],
            selectedIndex: null,
            selectedJobDescIndex: null,
            openDialog: false
        }
        this.addNewHistory = this.addNewHistory.bind(this);
        this.addNewHistoryJobDesc = this.addNewHistoryJobDesc.bind(this);
        this.handleStateDataChanged = this.handleStateDataChanged.bind(this);
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleCompanyChanged = this.handleCompanyChanged.bind(this);
        this.handlePositionChanged = this.handlePositionChanged.bind(this);
        this.handleJobDescChanged = this.handleJobDescChanged.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentEmployee.id != this.props.currentEmployee.id || nextProps.viewMode) {
            this.setState({selectedIndex: null});
            this.setState({selectedJobDescIndex: null});
        }
    }

    handleStateDataChanged(type, value){
        this.setState({[type]: value});
    }

    openDialogClick(){
        this.setState({
            historyStartDate: new Object,
            historyEndDate: new Object,
            company: '',
            position: '',
            jobDesc: [],
            openDialog: true
        });
    }

    closeDialogClick(){
        this.setState({openDialog: false});
    }

    updateClick(index, jobDescIndex){
        this.setState({selectedIndex: index});
        this.setState({selectedJobDescIndex: jobDescIndex});
    }

    deleteClick(index, jobDescIndex){
        var updatedEmployee = [];
        if (jobDescIndex != null){
            updatedEmployee = update(this.props.currentEmployee, {
                'history': {
                    [index]: {
                        "jobDesc": {
                            $splice: [[jobDescIndex,1]]
                        }
                    }
                }
            });
        } else {
            updatedEmployee = update(this.props.currentEmployee, {
                'history': {
                    $splice: [[index,1]]
                }
            });
        }
        this.props.setSavedEmployee(updatedEmployee);
        this.setState({selectedIndex: null});
        this.setState({selectedJobDescIndex: null});
    }

    handleJobDescChangedd(index, jobDescIndex, selectedJobDescValue){
        var updatedEmployee = update(this.props.currentEmployee, {
            'history': {
                [index]: {
                    "jobDesc": {
                        [jobDescIndex]: {$set: selectedJobDescValue}
                    }
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    addNewJobDesc(index, jobDescIndex){
        var updatedEmployee = update(this.props.currentEmployee, {
            'history': {
                [index]: {
                    "jobDesc": {
                        $push: [['']]
                    }
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    addNewHistoryJobDesc(){
        var updatedJobDesc = update(this.state.jobDesc, {$push: [['']]});
        this.handleStateDataChanged('jobDesc', updatedJobDesc);
    }

    handleStartDateChanged(e, value){
        this.handleStateDataChanged('historyStartDate', value);
    }

    handleEndDateChanged(e, value){
        this.handleStateDataChanged('historyEndDate', value);
    }

    handleCompanyChanged(e, value){
        this.handleStateDataChanged('company', value);
    }

    handlePositionChanged(e, value){
        this.handleStateDataChanged('position', value);
    }

    handleJobDescChanged(e, value, index){
        var updatedJobDesc = update(this.state.jobDesc, {
            [index]: {
                $set: value
            }
        });
        this.handleStateDataChanged('jobDesc', updatedJobDesc);
    }

    addNewHistory(){
        var updatedEmployee = update(this.props.currentEmployee, {
            'history': {
                $push: [{
                    historyStartDate: this.state.historyStartDate,
                    historyEndDate: this.state.historyEndDate,
                    company: this.state.company,
                    position: this.state.position,
                    jobDesc: this.state.jobDesc
                }]
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
        this.setState({openDialog: false});
    }

    render(){
        const actionsButton = [
            <FlatButton
                label="Add"
                primary={true}
                onClick={this.addNewHistory}
            />
        ];
        var historyList = this.props.currentEmployee.history;
        var employeeHistoryDetail = historyList.map((historyList, historyIndex) => (
            <EmployeeHistoryDetail
                key={historyIndex}
                index={historyIndex}
                history={historyList}
                viewMode={this.props.viewMode}
                selectedIndex={this.state.selectedIndex}
                selectedJobDescIndex={this.state.selectedJobDescIndex}
                deleteClick={this.deleteClick.bind(this)}
                updateClick={this.updateClick.bind(this)}
                handleJobDescChangedd={this.handleJobDescChangedd.bind(this)}
                addNewJobDesc={this.addNewJobDesc.bind(this)}/>
        ));
        var jobDescList = this.state.jobDesc;
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
                    open={this.state.openDialog}
                    autoScrollBodyContent={true}
                    onRequestClose={this.closeDialogClick}>
                        <DatePicker
                            className='detail-dialog'
                            floatingLabelText="History Start Date"
                            value={this.state.historyStartDate}
                            onChange={(e, value) => this.handleStartDateChanged(e, value)}
                            autoOk={true} />
                        <DatePicker
                            className='detail-dialog'
                            floatingLabelText="History End Date"
                            value={this.state.historyEndDate}
                            onChange={(e, value) => this.handleEndDateChanged(e, value)}
                            autoOk={true} />
                        <TextField
                            className='detail-dialog'
                            floatingLabelText="Company Name"
                            value={this.state.company}
                            onChange={(e, value) => this.handleCompanyChanged(e, value)}
                            underlineShow={true}/>
                        <TextField
                            className='detail-dialog'
                            style={{paddingLeft:10}}
                            floatingLabelText="Position"
                            value={this.state.position}
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