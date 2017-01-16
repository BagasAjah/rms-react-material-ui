import React, {Component} from 'react';

import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import ActionAccountBox from 'material-ui/svg-icons/action/account-box';

class EmployeeTabDetails extends Component {

    constructor(props) {
        super(props);
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }

    handleGenderChange(event, index, value){
        return  this.setState({value});
    }

    render(){
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
                    <MenuItem value={"M"} primaryText="Male" />
                    <MenuItem value={"F"} primaryText="Female" />
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
                    <MenuItem value={"S"} primaryText="Single" />
                    <MenuItem value={"M"} primaryText="Married" />
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
                    <MenuItem value={"C"} primaryText="Contract" />
                    <MenuItem value={"P"} primaryText="Permanent" />
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
                </SelectField><br />
                <SelectField
                    floatingLabelText="Division"
                    value={this.props.currentEmployee.division}>
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