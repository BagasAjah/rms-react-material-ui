import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';

import EmployeeHistoryDetail from "../containers/employee/EmployeeHistoryDetail"
import EmployeeHistoryDetailDialog from "../containers/employee/EmployeeHistoryDetailDialog"

import ContentAdd from 'material-ui/svg-icons/content/add';

class EmployeeTabHistory extends Component {
    constructor(props) {
        super(props);
        this.addNewHistory = this.addNewHistory.bind(this);
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
                        <EmployeeHistoryDetailDialog
                            pageMode={'NEW'}/>
                </Dialog>
            </div>
        )
    }
}

EmployeeTabHistory.propTypes = {
    currentEmployee: PropTypes.object,
    openDialog: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    viewMode: PropTypes.bool,
    setSavedEmployee: PropTypes.func,
    handleOpenDialogChanged: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeTabHistory;