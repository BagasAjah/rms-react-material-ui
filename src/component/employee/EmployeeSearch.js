import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';

import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import ContentSort from 'material-ui/svg-icons/content/sort';

import {white} from 'material-ui/styles/colors';

import EmployeeSortingDialog from "../containers/employee/EmployeeSortingDialog"
import Constants from "../styles/Constants";

import { generateSortCriteria } from  "../../lib/employee/employeeHelper"

class EmployeeSearch extends Component {

    constructor(props) {
        super(props);
        this.setFilteringProps = this.setFilteringProps.bind(this);
        this.handleFilteringClick = this.handleFilteringClick.bind(this);
        this.handleOpenSortingDialog = this.handleOpenSortingDialog.bind(this);
        this.handleCloseSortingDialog = this.handleCloseSortingDialog.bind(this);
        this.handleSortingClick = this.handleSortingClick.bind(this);
    }

    setFilteringProps = () => {
        this.props.setFilteringProps(this.filterTextInput.input.value, this.props.allEmployee);
    }

    handleFilteringClick = () => {
        console.dir('asdad');
    }

    handleOpenSortingDialog = () => {
        var nextState = update(this.props.pageDetail.sortCriteria, {
            $set: ['']
        });
        this.props.changePageDetailValue("sortCriteria", nextState);
        this.props.handleOpenDialogChanged("sortingDialog", true);
    }

    handleCloseSortingDialog = () => {
        this.props.handleOpenDialogChanged("sortingDialog", false);
    }

    handleSortingClick = () => {
        var sortCriteria = generateSortCriteria(this.props.pageDetail.sortCriteria);
        this.props.loadEmployees(0,sortCriteria);
        this.props.handleOpenDialogChanged("sortingDialog", false);
    }

    render = () => {
        const actionsSortingBtn = [
            <RaisedButton
                label="Ok"
                secondary={true}
                onTouchTap={this.handleSortingClick.bind(this)}
            />
        ];
        return(
            <ToolbarGroup className="toolbar-search-group">
                <IconButton style={Constants.small}>
                    <ActionSearch color={white} onClick={this.setFilteringProps}/>
                </IconButton>
                <TextField
                    ref={(input) => this.filterTextInput = input}
                    onChange={this.setFilteringProps}
                    value={this.props.searchingText}
                    hintText="Search"
                    underlineStyle={{display: 'none'}}
                    style ={{width: '40%', float:'right'}}
                    inputStyle={{color: white}}
                    hintStyle={{color: white}}/>
                <IconButton tooltip="Sort">
                    <ContentSort color={white} onClick={this.handleOpenSortingDialog}/>
                </IconButton>
                <IconButton tooltip="Filtering">
                    <ContentFilterList color={white} onClick={this.handleFilteringClick}/>
                </IconButton>
                <Chip>{this.props.employees.length}</Chip>
                <ToolbarSeparator />
                <Dialog
                    title="Sorting Option"
                    open={this.props.openDialog.sortingDialog}
                    autoScrollBodyContent={true}
                    actions={actionsSortingBtn}
                    onRequestClose={this.handleCloseSortingDialog}
                    contentStyle={{minWidth: "320px", maxWidth: "450px"}}>
                        <EmployeeSortingDialog />
                </Dialog>
            </ToolbarGroup>
        )
    }
}

EmployeeSearch.propTypes = {
    allEmployee: PropTypes.array,
    employees: PropTypes.array,
    searchingText: PropTypes.string,
    setFilteringProps: PropTypes.func
}

export default EmployeeSearch;