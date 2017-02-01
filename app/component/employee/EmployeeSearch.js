import React, {Component} from 'react';

import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import ContentSort from 'material-ui/svg-icons/content/sort';

import {white} from 'material-ui/styles/colors';

import Constants from "../styles/Constants";

class EmployeeSearch extends Component {

    constructor(props) {
        super(props);
        this.setFilteringProps = this.setFilteringProps.bind(this);
    }

    setFilteringProps() {
        this.props.setFilteringProps(this.filterTextInput.input.value);
    }

    render(){
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
                    <ContentSort color={white} />
                </IconButton>
                <IconButton tooltip="Order">
                    <ContentFilterList color={white} />
                </IconButton>
                <Chip>{this.props.employees.length}</Chip>
                <ToolbarSeparator />
            </ToolbarGroup>
        )
    }
}
export default EmployeeSearch;