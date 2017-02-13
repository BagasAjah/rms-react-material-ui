import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import lookupData from "../../dummy_data/lookupData"
import {handleEmployeeDetailsInfo} from "../../lib/employee/employeeHelper"

const styles = {
  customWidthField: {
    width: 150
  },
  customWidthDate: {
    width: 200
  }
};

const validationErrorMessage = "This field is required!";

class EmployeeGradeDialog extends Component {
    constructor(props) {
        super(props);
        this.handleDsChange = this.handleDsChange.bind(this);
        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
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
        return(
            <div>
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
            </div>
        )
    }
}

EmployeeGradeDialog.propTypes = {
    currentEmployee: PropTypes.object,
    newEmployee: PropTypes.object,
    openValidationMessage: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeGradeDialog;