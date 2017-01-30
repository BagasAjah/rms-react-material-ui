import React, {Component} from 'react';

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

import EmployeeTabDetails from "./EmployeeTabDetails"

class NewEmployeeDialog extends Component {
    constructor(props) {
        super(props);
        this.state={
            stepIndex: 0,
            finished: false,
            openDialog: false,
            employee: {
                id: 0,
                firstName: '',
                lastName: '',
                gender: '',
                dob: new Object,
                nationality: '',
                maritalStatus: '',
                phone: '',
                subDivision: '',
                status: '',
                suspendDate: new Object,
                hireDate: new Object,
                grade: '',
                division: '',
                email: '',
                office: '',
                history:[],
                gradeHistory: [],
                familyMember: [],
                location: []
            }
        }
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    setSavedEmployee(employee){
        this.setState({employee: employee});
    }

    openDialogClick(){
        this.setState({
            openDialog: true,
            stepIndex: 0,
            finished: false,
            employee: {
                id: 0,
                firstName: '',
                lastName: '',
                gender: '',
                dob: new Object,
                nationality: '',
                maritalStatus: '',
                phone: '',
                subDivision: '',
                status: '',
                suspendDate: new Object,
                hireDate: new Object,
                grade: '',
                division: '',
                email: '',
                office: '',
                history:[],
                gradeHistory: [],
                familyMember: [],
                location: []
            }
        });
    }

    closeDialogClick(){
        this.setState({openDialog: false});
    }

    handleNext(){
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        });
        if(stepIndex > 2){
            this.props.addCurrentEmployee(this.state.employee);
            this.setState({openDialog: false});
        }
    }

    handlePrev(){
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return (
                <EmployeeTabDetails
                    viewMode={false}
                    currentEmployee={this.state.employee}
                    setSavedEmployee={this.setSavedEmployee.bind(this)}
                    />);
          case 1:
            return 'History';
          case 2:
            return 'Grade';
          default:
            return 'You\'re a long way from home sonny jim!';
        }
    }

    render(){
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
                    open={this.state.openDialog}
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
export default NewEmployeeDialog;