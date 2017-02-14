import React, {Component, PropTypes} from 'react';

import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ContentAdd from 'material-ui/svg-icons/content/add';

import EmployeeTabDetails from "../containers/employee/EmployeeTabDetails"
import EmployeeHistoryDetailDialog from "../containers/employee/EmployeeHistoryDetailDialog"
import EmployeeGradeDialog from "../containers/employee/EmployeeGradeDialog"
import EmployeeTabFamilyMember from "../containers/employee/EmployeeTabFamilyMember"

import { setDefaultEmployee } from "../../lib/employee/employeeHelper";

class NewEmployeeDialog extends Component {
    constructor(props) {
        super(props);
        this.state={
            stepIndex: 0,
            finished: false,
        }
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    setSavedEmployee = (employee) => {
        this.props.setSavedEmployee(employee);
    }

    openDialogClick = () => {
        this.props.handleOpenDialogChanged('newEmployeeDialog', true);
        this.props.handleStateChanged('newEmployee', setDefaultEmployee());
        this.setState({
            stepIndex: 0,
            finished: false
        });
    }

    closeDialogClick = () => {
        this.props.handleOpenDialogChanged('newEmployeeDialog', false);
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 3,
        });
        if(stepIndex > 3){
            this.props.addCurrentEmployee(this.props.newEmployee);
            this.props.handleOpenDialogChanged('newEmployeeDialog', false);
        }
    }

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({
            stepIndex: stepIndex - 1,
            finished: false
          });
        }
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
          case 0:
            return (
                <EmployeeTabDetails
                    currentEmployee = {this.props.newEmployee}
                    pageMode ={'NEW'}
                    viewMode = {false}/>);
          case 1:
            return (
                <div>
                    <h2>Employee History Details</h2>
                    <EmployeeHistoryDetailDialog
                        pageMode={'NEW'}/>
                </div>);
          case 2:
            return (
                <div>
                    <h2>Employee Grade Details</h2>
                    <EmployeeGradeDialog
                        pageMode={'NEW'}/>
                </div>);
          case 3:
            return (
                <EmployeeTabFamilyMember
                    currentEmployee={this.props.newEmployee}
                    pageMode ={'NEW'}
                    viewMode={false}/>);
          default:
            return 'You\'re a long way from home sonny jim!';
        }
    }

    render = () => {
        const {stepIndex, finished} = this.state;
        const actionsButton = [
            <RaisedButton
                label="Cancel"
                style={{float:"left"}}
                onClick={this.closeDialogClick}
            />,
            <RaisedButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
            />,
            <RaisedButton
                label={finished ? 'Create Employee' : 'Next'}
                secondary={true}
                onTouchTap={this.handleNext}
            />
        ];
        const title = [
            <Stepper key="newEmployeeStepper" activeStep={stepIndex}>
                <Step>
                    <StepLabel>Details</StepLabel>
                </Step>
                <Step>
                    <StepLabel>History</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Grade</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Family</StepLabel>
                </Step>
            </Stepper>
        ];
        return(
            <div>
                <FloatingActionButton className="add-button-position" secondary={true} onClick={this.openDialogClick}>
                  <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title={title}
                    contentStyle={{width: '65%',maxWidth: 'none'}}
                    actions={actionsButton}
                    modal={false}
                    contentStyle={{width: "65%", maxWidth: "none", height:"65%", maxHeight:"none"}}
                    open={this.props.openDialog.newEmployeeDialog}
                    autoScrollBodyContent={true}
                    onRequestClose={this.closeDialogClick}>
                    <div>
                        {this.getStepContent(stepIndex)}
                    </div>
                </Dialog>
            </div>
        )
    }
}

NewEmployeeDialog.propTypes = {
    openDialog: PropTypes.object,
    newEmployee: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    addCurrentEmployee: PropTypes.func,
    handleOpenDialogChanged: PropTypes.func
}

export default NewEmployeeDialog;