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
        this.state = {
            ds: '',
            grade: '',
            startDate: new Object,
            endDate: new Object,
            showCheckboxes: false,
            openDialog: false,
            lookupGrade: lookupData.grade,
            openValidationMessage: false
        }
        this.addGradeHistoryClick = this.addGradeHistoryClick.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.handleDsChange = this.handleDsChange.bind(this);
        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    openDialogClick(){
        this.setState({
            ds: '',
            grade: '',
            startDate: new Object,
            endDate: new Object,
            openDialog: true,
            openValidationMessage: false
        });
    }

    closeDialogClick(){
        this.setState({openDialog: false});
        this.setState({openValidationMessage: false});
    }

    addGradeHistoryClick(){
        if(this.state.ds == '' || this.state.grade =='' || this.state.startDate == new Object) {
            this.setState({openValidationMessage: true});
        } else {
            var currentEmployee = this.props.currentEmployee;
            currentEmployee.gradeHistory.reverse();
            var updatedEmployee = update(currentEmployee, {'gradeHistory': {
                $push: [{
                    ds: this.state.ds,
                    grade: this.state.grade,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                }]
            }});
            updatedEmployee.gradeHistory.reverse();
            this.props.setSavedEmployee(updatedEmployee);
            this.closeDialogClick();
        }
    }

    deleteClick(){
        if(!this.props.viewMode){
            var currentGradeHistory = this.props.currentEmployee.gradeHistory[0];
            var updatedEmployee = update(this.props.currentEmployee, {'gradeHistory': {$splice: [[0,1]]}});
            this.props.setSavedEmployee(updatedEmployee);
        }
    }

    handleDsChange(e, index, value){
        this.setState({ds: value});
    }

    handleGradeChange(e, index, value){
        this.setState({grade: value});
    }

    handleStartDateChange(e, value){
        this.setState({startDate: value});
    }

    handleEndDateChange(e, value){
        this.setState({endDate: value});
    }

    render(){
        const actionsButton = [
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.addGradeHistoryClick}
            />
        ];
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

        var lookupGradeMenuItem = this.state.lookupGrade.map(lookupGrade =>
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
        return(
            <div className="menu-content">
                <h2>Employee Grade History</h2>
                <Table>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
                        <TableRow>
                            <TableHeaderColumn>DS</TableHeaderColumn>
                            <TableHeaderColumn>Grade</TableHeaderColumn>
                            <TableHeaderColumn>Start Date</TableHeaderColumn>
                            <TableHeaderColumn>End Date</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        {gradeHistoryListDetail}
                    </TableBody>
                </Table>
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
                  open={this.state.openDialog}
                  onRequestClose={this.closeDialogClick}>
                    <SelectField
                        className="grade-history-width"
                        style={styles.customWidthField}
                        floatingLabelText="DS"
                        maxHeight={200}
                        value={this.state.ds}
                        errorText={this.state.openValidationMessage?validationErrorMessage:""}
                        onChange={(e, i, value) => this.handleDsChange(e, i, value)}>
                        {lookupDS}
                    </SelectField>
                    <SelectField
                        className="grade-history-width"
                        style={styles.customWidthField}
                        floatingLabelText="Grade"
                        maxHeight={200}
                        value={this.state.grade}
                        errorText={this.state.openValidationMessage?validationErrorMessage:""}
                        onChange={(e, i, value) => this.handleGradeChange(e, i, value)}>
                        {lookupGradeMenuItem}
                    </SelectField>
                    <DatePicker
                        className="grade-history-width"
                        style={styles.customWidthDate}
                        floatingLabelText="Start Date"
                        value={this.state.startDate}
                        errorText={this.state.openValidationMessage?validationErrorMessage:""}
                        onChange={(e, value) => this.handleStartDateChange(e, value)}
                        autoOk={true} />
                    <DatePicker
                        className="grade-history-width"
                        style={styles.customWidthDate}
                        floatingLabelText="End Date"
                        value={this.state.endDate}
                        onChange={(e, value) => this.handleEndDateChange(e, value)}
                        autoOk={true} />
                </Dialog>
            </div>
        )
    }

}
export default EmployeeTabGradeHistory;