import React, {Component} from 'react';
import update from 'react-addons-update';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';

import EmployeeHistoryDetail from "./EmployeeHistoryDetail"

import ContentAdd from 'material-ui/svg-icons/content/add';

class EmployeeTabHistory extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedIndex: null,
            selectedJobDescIndex: null,
            selectedJobDescValue: '',
            openDialog: false
        }
        this.handleStateDataChange = this.handleStateDataChange.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentEmployee.id != this.props.currentEmployee.id || nextProps.viewMode) {
            this.setState({selectedIndex: null});
            this.setState({selectedJobDescIndex: null});
        }
    }

    handleStateDataChange(type, value){
        this.setState({[type]: value});
    }

    openDialogClick(){
        this.setState({
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

    handleJobDescChanged(index, jobDescIndex, selectedJobDescValue){
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

    render(){
        const actionsButton = [
            <FlatButton
                label="Add"
                primary={true}
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
                handleJobDescChanged={this.handleJobDescChanged.bind(this)}
                addNewJobDesc={this.addNewJobDesc.bind(this)}/>
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
                    contentStyle={{width: '70%',maxWidth: 'none'}}
                    title="Employee History Details"
                    actions={actionsButton}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.closeDialogClick}>

                </Dialog>
            </div>
        )
    }
}

export default EmployeeTabHistory;