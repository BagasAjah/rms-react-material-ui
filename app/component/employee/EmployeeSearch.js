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

    render(){
        return(
            <ToolbarGroup className="toolbar-search-group">
                <IconButton style={Constants.small}>
                    <ActionSearch color={white} />
                </IconButton>
                <TextField
                    value=""
                    hintText="Search"
                    underlineStyle={{display: 'none'}}
                    style ={{width: '40%'}}
                    inputStyle={{color: white}}
                    hintStyle={{color: white}}/>
                <IconButton tooltip="Sort">
                    <ContentSort color={white} />
                </IconButton>
                <IconButton tooltip="Order">
                    <ContentFilterList color={white} />
                </IconButton>
                <Chip>12</Chip>
                <ToolbarSeparator />
            </ToolbarGroup>
        )
    }
}
export default EmployeeSearch;