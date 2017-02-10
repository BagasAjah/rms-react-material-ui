import React, {Component} from 'react';
import {Toolbar} from 'material-ui/Toolbar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import EmployeeTab from "../containers/employee/EmployeeTab"
import EmployeeSearch from "../containers/employee/EmployeeSearch"
import Constants from "../styles/Constants"

class EmployeeToolbar extends Component {

  render = () => {
    return(
        <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo400)}>
          <Toolbar style={Constants.toolBarColor}>
            <EmployeeSearch />
            <EmployeeTab
                newEmployee={this.props.newEmployee}
                openDialog={this.props.openDialog}
                openValidationMessage={this.props.openValidationMessage}
                selectedIndex={this.props.selectedIndex}
                handleOpenDialogChanged={this.props.handleOpenDialogChanged.bind(this)}
                handleOpenValidationMessage={this.props.handleOpenValidationMessage.bind(this)}/>
          </Toolbar>
        </MuiThemeProvider>
    );
  }
}
export default EmployeeToolbar;