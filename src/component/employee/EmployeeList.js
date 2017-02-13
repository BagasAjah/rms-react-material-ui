import React, {Component, PropTypes} from 'react';

import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Constants from "../styles/Constants"

import EmployeeListDetail from "../containers/employee/EmployeeListDetail"
import NewEmployeeDialog from "../containers/employee//NewEmployeeDialog"

class EmployeeList extends Component {

    constructor(props){
        super(props);
    }

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
                    <NewEmployeeDialog pageMode={'NEW'} />
                </div>
            </MuiThemeProvider>
        )
    }
}

EmployeeList.propTypes = {
    employees: PropTypes.array
}

export default EmployeeList;