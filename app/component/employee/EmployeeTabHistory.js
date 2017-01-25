import React, {Component} from 'react';
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
            openDialog: false
        }
        this.handleStateDataChange = this.handleStateDataChange.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
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
                location={historyList}
                viewMode={this.props.viewMode}/>
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