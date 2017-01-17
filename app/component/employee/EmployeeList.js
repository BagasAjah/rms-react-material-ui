import React, {Component} from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

import ContentAdd from 'material-ui/svg-icons/content/add';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Constants from "../styles/Constants"
import EmployeeListDetail from "./EmployeeListDetail"

class EmployeeList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var employee = this.props.employees;

        var employeeListDetail = employee.map( employee =>
            <EmployeeListDetail
                key={employee.id}
                employee={employee}
                setCurrentEmployee={this.props.setEmployees.bind(this)}
                />
        );
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo400)}>
                <div>
                    <List className="employee-list-group">
                        {employeeListDetail}
                    </List>

                    <FloatingActionButton className="add-button-position" secondary={true}>
                      <ContentAdd />
                    </FloatingActionButton>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default EmployeeList;