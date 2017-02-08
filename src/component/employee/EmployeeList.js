import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Constants from "../styles/Constants"
//import EmployeeListDetail from "./EmployeeListDetail"
import EmployeeListDetail from "../containers/employee/EmployeeListDetail"
import NewEmployeeDialog from "./NewEmployeeDialog"

class EmployeeList extends Component {

    render = () => {
        var employee = this.props.employees;

        var employeeListDetail = employee.map( (employee, index) =>
            <EmployeeListDetail
                key={index}
                index={index}
                employee={employee}/>
        );
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo400)}>
                <div>
                    {(employeeListDetail.length > 0) ?
                    (<List className="employee-list-group">
                            {employeeListDetail}
                    </List>)
                    :
                        (<div className="no-record">
                            <span>We couldn't find what you were looking for</span>
                        </div>)
                    }
                    <NewEmployeeDialog
                        newEmployee={this.props.newEmployee}
                        openDialog={this.props.openDialog}
                        addCurrentEmployee={this.props.addCurrentEmployee}
                        handleOpenDialogChanged={this.props.handleOpenDialogChanged}/>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default EmployeeList;