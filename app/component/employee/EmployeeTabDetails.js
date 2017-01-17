import React, {Component} from 'react';

import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import ActionAccountBox from 'material-ui/svg-icons/action/account-box';

import lookupData from "../../dummy_data/lookupData"

class EmployeeTabDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lookupGender : lookupData.gender,
            lookupMaritalStatus : lookupData.statusMarital,
            lookupStatus : lookupData.status,
            lookupGrade : lookupData.grade,
            lookupDivision : lookupData.division
        }
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }

    handleGenderChange(event, index, value){
        return  this.setState({value});
    }

    render(){
        var lookupGenderMenuItem = this.state.lookupGender.map(lookupGender =>
            <MenuItem key= {lookupGender.lookupCode} value={lookupGender.lookupCode} primaryText={lookupGender.lookupValue} />
        );
        var lookupMaritalStatusMenuItem = this.state.lookupMaritalStatus.map(lookupMaritalStatus =>
            <MenuItem key= {lookupMaritalStatus.lookupCode} value={lookupMaritalStatus.lookupCode} primaryText={lookupMaritalStatus.lookupValue} />
        );
        var lookupStatusMenuItem = this.state.lookupStatus.map(lookupStatus =>
            <MenuItem key= {lookupStatus.lookupCode} value={lookupStatus.lookupCode} primaryText={lookupStatus.lookupValue} />
        );
        var lookupGradeMenuItem = this.state.lookupGrade.map(lookupGrade =>
            <MenuItem key= {lookupGrade.lookupCode} value={lookupGrade.lookupCode} primaryText={lookupGrade.lookupValue} />
        );
        var lookupDivisionMenuItem = this.state.lookupDivision.map(lookupDivision =>
            <MenuItem key= {lookupDivision.lookupCode} value={lookupDivision.lookupCode} primaryText={lookupDivision.lookupValue} />
        );
        return(
        <div className="menu-content">
            <div className="content">
                <input type="hidden" id="employeeId"/>
                <TextField
                    floatingLabelText="First Name"
                    value={this.props.currentEmployee.firstName}
                /><br />
                <TextField
                    floatingLabelText="Last Name"
                    value={this.props.currentEmployee.lastName}
                /><br />
                <SelectField
                    floatingLabelText="Gender"
                    value={this.props.currentEmployee.gender}
                    onChange={this.handleGenderChange}>
                    {lookupGenderMenuItem}
                </SelectField><br />
                <DatePicker
                    floatingLabelText="Date of Birth"
                    value={this.props.currentEmployee.dob}
                    autoOk={true}
                />
                <TextField
                    floatingLabelText="Nationality"
                    value={this.props.currentEmployee.nationality}
                /><br />
                <SelectField
                    floatingLabelText="Marital Status"
                    value={this.props.currentEmployee.maritalStatus}>
                    {lookupMaritalStatusMenuItem}
                </SelectField><br />
                <TextField
                    floatingLabelText="Phone"
                    value={this.props.currentEmployee.phone}
                /><br />
            </div>
            <div className="content">
                <TextField
                    floatingLabelText="Sub Division"
                    value={this.props.currentEmployee.subDivision}
                /><br />
                <SelectField
                    floatingLabelText="Status"
                    value={this.props.currentEmployee.status}>
                    {lookupStatusMenuItem}
                </SelectField><br />
                <DatePicker
                    floatingLabelText="Suspend Date"
                    value={this.props.currentEmployee.suspendDate}
                />
                <DatePicker
                    floatingLabelText="Hire Date"
                    value={this.props.currentEmployee.hireDate}
                />
                <SelectField
                    floatingLabelText="Grade"
                    value={this.props.currentEmployee.grade}>
                    {lookupGradeMenuItem}
                </SelectField><br />
                <SelectField
                    floatingLabelText="Division"
                    value={this.props.currentEmployee.division}>
                    {lookupDivisionMenuItem}
                </SelectField><br />
                <TextField
                    floatingLabelText="Email"
                    value={this.props.currentEmployee.email}
                /><br />
            </div>
            <div className="content">
                <Avatar
                  src={require("../../images/BagasDimas.jpg")}
                  size={100}
                />
            </div>
        </div>
        )
    }
}

export default EmployeeTabDetails;