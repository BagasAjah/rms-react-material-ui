import React, {Component} from 'react';
import moment from 'moment';

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
        this.handleOfficeLocationChange = this.handleOfficeLocationChange.bind(this);
        this.handleOfficeAddressChange = this.handleOfficeAddressChange.bind(this);
    }

    handleOfficeLocationChange(e, index, value, locationIndex){
        this.props.handleDataChange(locationIndex, value, 'officeLocation');
    }

    handleOfficeAddressChange(e, value, index){
        this.props.handleDataChange(index, value, 'officeAddress');
    }

    updateClick(index){
        this.props.updateClick(index);
    }

    deleteClick(index){
        this.props.deleteClick(index);
    }

    render() {
        var lookupLocationMenuItem = this.state.lookupLocation.map(lookupLocation =>
            <MenuItem key= {lookupLocation.lookupCode} value={lookupLocation.lookupCode} primaryText={lookupLocation.lookupValue} />
        );
        var officeStartMonth = moment(this.props.location.officeStartDate).format("MMMM").toString();
        var officeStartYear = moment(this.props.location.officeStartDate).format("YYYY").toString();
        var officeEndMonth = moment(this.props.location.officeEndDate).format("MMMM").toString();
        var officeEndYear = moment(this.props.location.officeEndDate).format("YYYY").toString();
        if (this.props.location.officeEndDate == null){
            officeEndMonth = '';
            officeEndYear = 'PRESENT';
        }
        return (
            <div className="detail-content">
                <div className="detail-content-divider-vertical"/>
                <div className="detail-content-left">
                    <div style={{color: indigo900}}>
                        <span style={{marginLeft:30}}>{officeStartMonth}</span>
                        <span style={{marginRight:30, float: "right"}}>{officeEndMonth}</span>
                    </div>
                    <div style={{fontSize:'150%', color: indigo900}}>
                        <span style={{marginLeft:30}}>{officeStartYear}</span>
                        <span style={{marginLeft:75}}> - </span>
                        <span style={{marginRight:40, float: "right"}}>{officeEndYear}</span>
                    </div>
                </div>
                <div className="detail-content-right">
                    <SelectField
                        id={"location-id-"+this.props.index}
                        maxHeight={200}
                        value={this.props.location.officeLocation}
                        onChange={(e, i, value) => this.handleOfficeLocationChange(e, i, value, this.props.index)}
                        disabled={this.props.index==this.props.selectedIndex?false:true}
                        underlineShow={false}>
                        {lookupLocationMenuItem}
                    </SelectField>
                    {(!this.props.viewMode) ?
                        (<span>
                            <ContentUpdate onClick={this.updateClick.bind(this,this.props.index)}/>
                            <ActionDelete onClick={this.deleteClick.bind(this,this.props.index)}/>
                        </span>) : ''
                    }<br />
                    <TextField
                        floatingLabelText="Address"
                        value={this.props.location.officeAddress}
                        onChange={(e, value) => this.handleOfficeAddressChange(e, value, this.props.index)}
                        multiLine={true}
                        rows={2}
                        rowsMax={2}
                        disabled={this.props.index==this.props.selectedIndex?false:true}
                        underlineShow={false}/><br />
                </div><br /><br />

            </div>
        )
    }
}

export default EmployeeLocationDetail;