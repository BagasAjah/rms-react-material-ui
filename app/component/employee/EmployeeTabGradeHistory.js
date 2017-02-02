import React, {Component} from 'react';
import moment from 'moment'
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {grey500} from 'material-ui/styles/colors';

import lookupData from "../../dummy_data/lookupData"
import {handleEmployeeDetailsInfo} from "../lib/employee/employeeHelper"

const styles = {
  customWidthDialog: {
      width: '50%',
      maxWidth: 'none',
  },
  customWidthField: {
    width: 150
  },
  customWidthDate: {
    width: 200
  }

};

const validationErrorMessage = "This field is required!";

class EmployeeTabGradeHistory extends Component {

    constructor(props) {
        super(props);
        this.addGradeHistoryClick = this.addGradeHistoryClick.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.handleDsChange = this.handleDsChange.bind(this);
        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    openDialogClick = () => {
        var updatedEmployee = update(this.props.newEmployee, {
            'gradeHistory': {
                0: {
                    'ds':  {$set: ''},
                    'grade': {$set: ''},
                    'startDate': {$set: null},
                    'endDate': {$set: new Object}
                }
            }
        });
        this.props.handleOpenDialogChanged('gradeDialog', true);
        this.props.handleOpenValidationMessage('gradeValidation', false);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    closeDialogClick = () => {
        this.props.handleOpenDialogChanged('gradeDialog', false);
        this.props.handleOpenValidationMessage('gradeValidation', false);
    }

    addGradeHistoryClick = () => {
        var gradeHistory = this.props.newEmployee.gradeHistory[0];
        if(gradeHistory.ds == '' || gradeHistory.grade =='' || gradeHistory.startDate == null) {
            this.props.handleOpenValidationMessage('gradeValidation', true);
        } else {
            var currentEmployee = this.props.currentEmployee;
            currentEmployee.gradeHistory.reverse();
            var updatedEmployee = update(currentEmployee, {'gradeHistory': {
                $push: [{
                    ds: gradeHistory.ds,
                    grade: gradeHistory.grade,
                    startDate: gradeHistory.startDate,
                    endDate: gradeHistory.endDate
                }]
            }});
            updatedEmployee.gradeHistory.reverse();
            this.props.setSavedEmployee(updatedEmployee);
            this.closeDialogClick();
        }
    }

    deleteClick = () => {
        if(!this.props.viewMode){
            var currentGradeHistory = this.props.currentEmployee.gradeHistory[0];
            var updatedEmployee = update(this.props.currentEmployee, {'gradeHistory': {$splice: [[0,1]]}});
            this.props.setSavedEmployee(updatedEmployee);
        }
    }

    handleDsChange = (e, index, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('gradeHistory','ds', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleGradeChange = (e, index, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('gradeHistory','grade', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleStartDateChange = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('gradeHistory','startDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleEndDateChange = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('gradeHistory','endDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    render = () => {
        const noDataFound = [
            <TableRow key='not-found'>
                <TableRowColumn style={{textAlign: 'center'}}>
                    <TextField
                        id="not-found-field"
                        value={"No Grade Data Found"}
                        disabled={true}
                        underlineShow={false}/>
                </TableRowColumn>
            </TableRow>
        ];
        const actionsButton = [
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.addGradeHistoryClick}
            />
        ];
        var employeeNotFound = true;
        if (this.props.currentEmployee) {
            var gradeHistory = this.props.currentEmployee.gradeHistory;

            var dsData = [];
            for(var i=1; i<23; i++){
                dsData.push(i);
            }
            for(var i=0; i<gradeHistory.length; i++){
                delete dsData[dsData.indexOf(gradeHistory[i].ds)];
            }

            var lookupDS = dsData.map( dsData =>
                <MenuItem key= {dsData} value={dsData} primaryText={"DS"+dsData} />
            );

            var lookupGradeMenuItem = lookupData.grade.map(lookupGrade =>
                <MenuItem key= {lookupGrade.lookupCode} value={lookupGrade.lookupCode} primaryText={lookupGrade.lookupValue} />
            );
            var gradeHistoryListDetail = gradeHistory.map( (gradeHistory, index) =>
                (<TableRow key={index}>
                    <TableRowColumn>
                        <TextField
                            id={"ds-"+gradeHistory.ds}
                            value={"DS"+gradeHistory.ds}
                            disabled={true}
                            underlineShow={false}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <SelectField
                            id={"grade-"+gradeHistory.ds}
                            className="grade-history-width"
                            maxHeight={200}
                            value={gradeHistory.grade}
                            disabled={true}
                            underlineShow={false}>
                            {lookupGradeMenuItem}
                        </SelectField>
                    </TableRowColumn>
                    <TableRowColumn>
                        <DatePicker
                            id={"start-date-"+gradeHistory.ds}
                            value={gradeHistory.startDate}
                            autoOk={true}
                            disabled={true}
                            underlineShow={false}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <DatePicker
                            id={"end-date-"+gradeHistory.ds}
                            value={gradeHistory.endDate}
                            autoOk={true}
                            disabled={true}
                            underlineShow={false}
                        />
                    </TableRowColumn>
                    <TableRowColumn>{
                        (index == 0) ?
                            <ActionDelete color={grey500} onClick={this.deleteClick}/>
                        : ''
                    }</TableRowColumn>
                </TableRow>)
            );
            employeeNotFound = false;
        }
        return(
            <div className="menu-content">
                <h2>Employee Grade History</h2>
                {employeeNotFound ? (<div style={{textAlign: 'center'}}>Employee Grade Not Found</div>) :
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>DS</TableHeaderColumn>
                            <TableHeaderColumn>Grade</TableHeaderColumn>
                            <TableHeaderColumn>Start Date</TableHeaderColumn>
                            <TableHeaderColumn>End Date</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {(gradeHistoryListDetail.length == 0) ?
                                (noDataFound) : (gradeHistoryListDetail)}
                    </TableBody>
                </Table>
                }
                <FloatingActionButton className="btn-add-tab-position"
                    backgroundColor={grey500}
                    onClick={this.openDialogClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="New Grade History"
                    contentStyle={styles.customWidthDialog}
                    actions={actionsButton}
                    modal={false}
                    open={this.props.openDialog.gradeDialog}
                    onRequestClose={this.closeDialogClick}>
                        <SelectField
                            className="grade-history-width"
                            style={styles.customWidthField}
                            floatingLabelText="DS"
                            maxHeight={200}
                            value={this.props.newEmployee.gradeHistory[0].ds}
                            errorText={this.props.openValidationMessage.gradeValidation && (this.props.newEmployee.gradeHistory[0].ds=='')?validationErrorMessage:""}
                            onChange={(e, i, value) => this.handleDsChange(e, i, value)}>
                            {lookupDS}
                        </SelectField>
                        <SelectField
                            className="grade-history-width"
                            style={styles.customWidthField}
                            floatingLabelText="Grade"
                            maxHeight={200}
                            value={this.props.newEmployee.gradeHistory[0].grade}
                            errorText={this.props.openValidationMessage.gradeValidation && (this.props.newEmployee.gradeHistory[0].grade=='')?validationErrorMessage:""}
                            onChange={(e, i, value) => this.handleGradeChange(e, i, value)}>
                            {lookupGradeMenuItem}
                        </SelectField>
                        <DatePicker
                            className="grade-history-width"
                            style={styles.customWidthDate}
                            floatingLabelText="Start Date"
                            value={this.props.newEmployee.gradeHistory[0].startDate}
                            errorText={this.props.openValidationMessage.gradeValidation && (this.props.newEmployee.gradeHistory[0].startDate==null)?validationErrorMessage:""}
                            onChange={(e, value) => this.handleStartDateChange(e, value)}
                            autoOk={true} />
                        <DatePicker
                            className="grade-history-width"
                            style={styles.customWidthDate}
                            floatingLabelText="End Date"
                            value={this.props.newEmployee.gradeHistory[0].endDate}
                            onChange={(e, value) => this.handleEndDateChange(e, value)}
                            autoOk={true} />
                </Dialog>
            </div>
        )
    }

}
export default EmployeeTabGradeHistory;