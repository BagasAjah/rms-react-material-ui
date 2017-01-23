import React, {Component} from 'react';
import moment from 'moment';

import Divider from 'material-ui/Divider';
import {ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentUpdate from 'material-ui/svg-icons/content/create';

import {indigo900} from 'material-ui/styles/colors';

import lookupData from "../../dummy_data/lookupData"

class EmployeeLocationDetail extends Component {
    constructor(props) {
        super(props);
        this.state ={
            lookupLocation : lookupData.location
        };
    }

    render() {
        var lookupLocationMenuItem = this.state.lookupLocation.map(lookupLocation =>
            <MenuItem key= {lookupLocation.lookupCode} value={lookupLocation.lookupCode} primaryText={lookupLocation.lookupValue} />
        );
        var officeStartMonth = moment(this.props.location.officeStartDate).format("MMMM").toString();
        var officeStartYear = moment(this.props.location.officeStartDate).format("YYYY").toString();
        var officeEndMonth = moment(this.props.location.officeEndDate).format("MMMM").toString();
        var officeEndYear = moment(this.props.location.officeEndDate).format("YYYY").toString();
        return (
            <div className="location-content">
                <div className="location-divider-vertical"/>
                <div className="location-date-content">
                    <div style={{color: indigo900}}>
                        <span style={{marginLeft:30}}>{officeStartMonth}</span>
                        <span style={{marginRight:30, float: "right"}}>{officeEndMonth}</span>
                    </div>
                    <div style={{fontSize:'200%', color: indigo900}}>
                        <span style={{marginLeft:30}}>{officeStartYear}</span>
                        <span style={{marginLeft:75}}> - </span>
                        <span style={{marginRight:20, float: "right"}}>{officeEndYear}</span>
                    </div>
                </div>
                <div className="location-detail-content">
                    <SelectField
                        id={"location-id-"+this.props.index}
                        maxHeight={200}
                        value={this.props.location.officeLocation}
                        disabled={this.props.viewMode}
                        underlineShow={false}>
                        {lookupLocationMenuItem}
                    </SelectField>
                    {(!this.props.viewMode) ?
                        (<span>
                            <ContentUpdate />
                            <ActionDelete />
                        </span>) : ''
                    }<br />
                    <TextField
                        floatingLabelText="Address"
                        value={this.props.location.officeAddress}
                        multiLine={true}
                        rows={2}
                        rowsMax={2}
                        disabled={this.props.viewMode}
                        underlineShow={false}/><br />
                </div>
                <div className="location-action-content">
                </div><br /><br />

            </div>
        )
    }
}

export default EmployeeLocationDetail;
