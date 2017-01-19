import React, {Component} from 'react';
import {Toolbar} from 'material-ui/Toolbar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import EmployeeTab from "./EmployeeTab"
import EmployeeSearch from "./EmployeeSearch"
import Constants from "../styles/Constants"

class EmployeeToolbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
        <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo400)}>
          <Toolbar style={Constants.toolBarColor}>
            <EmployeeSearch
                employees={this.props.employees}
                setFilteringProps={this.props.setFilteringProps.bind(this)}/>
            <EmployeeTab
                currentEmployee={this.props.currentEmployee}
                updateCurrentEmployee={this.props.updateCurrentEmployee.bind(this)}
                deleteCurrentEmployee={this.props.deleteCurrentEmployee.bind(this)}/>
          </Toolbar>
        </MuiThemeProvider>
    );
  }
}
export default EmployeeToolbar;