import React, {Component, PropTypes} from 'react';

import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Constants from "../styles/Constants"

import EmployeeListDetail from "../containers/employee/EmployeeListDetail"
import NewEmployeeDialog from "../containers/employee//NewEmployeeDialog"
import SimplePagination from "../common/SimplePagination"

import C from '../../constants'

import { generateSortCriteria } from  "../../lib/employee/employeeHelper"

class EmployeeList extends Component {

    constructor(props){
        super(props);
        this.onPageChangeFromPagination = this.onPageChangeFromPagination.bind(this);
    }

    onPageChangeFromPagination(newPage) {
        var sortCriteria = generateSortCriteria(this.props.pageDetail.sortCriteria);
        this.props.loadEmployeeData(newPage-1, sortCriteria);
        this.props.changePageDetailValue("currentPage", newPage);
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
                    <SimplePagination
                        currentPage={this.props.pageDetail.currentPage}
                        totalPages={Math.ceil(this.props.pageDetail.totalEmployees/C.PAGE_DATA_SIZE)}
                        boundaryPagesRange={1}
                        siblingPagesRange={1}
                        onChange={this.onPageChangeFromPagination}/>
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