import React, {Component} from 'react';
import {Toolbar} from 'material-ui/Toolbar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import EmployeeTab from "./EmployeeTab"
import EmployeeSearch from "./EmployeeSearch"
import Constants from "../styles/Constants"

class EmployeeToolbar extends Component {

  render = () => {
    return(
        <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo400)}>
          <Toolbar style={Constants.toolBarColor}>
            <EmployeeSearch
                employees={this.props.employees}
                searchingText={this.props.searchingText}
                setFilteringProps={this.props.setFilteringProps.bind(this)}/>
            <EmployeeTab
                currentEmployee={this.props.currentEmployee}
                currentTabLocation={this.props.currentTabLocation}
                editedEmployee={this.props.editedEmployee}
                newEmployee={this.props.newEmployee}
                openDialog={this.props.openDialog}
                openValidationMessage={this.props.openValidationMessage}
                selectedJobDescIndex={this.props.selectedJobDescIndex}
                selectedIndex={this.props.selectedIndex}
                viewMode={this.props.viewMode}
                updateCurrentEmployee={this.props.updateCurrentEmployee.bind(this)}
                deleteCurrentEmployee={this.props.deleteCurrentEmployee.bind(this)}
                handleOpenDialogChanged={this.props.handleOpenDialogChanged.bind(this)}
                handleOpenValidationMessage={this.props.handleOpenValidationMessage.bind(this)}
                handleStateChanged={this.props.handleStateChanged.bind(this)}/>
          </Toolbar>
        </MuiThemeProvider>
    );
  }
}
export default EmployeeToolbar;