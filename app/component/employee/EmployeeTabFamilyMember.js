import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {grey500} from 'material-ui/styles/colors';

import lookupData from "../../dummy_data/lookupData"

const style = {
    headerStyle:{
        font: "bold"
    }
}

class EmployeeTabFamilyMember extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCheckboxes: false,
            lookupGender: lookupData.gender
        }
    }

    render(){
        var lookupGenderMenuItem = this.state.lookupGender.map(lookupGender =>
            <MenuItem key= {lookupGender.lookupCode} value={lookupGender.lookupCode} primaryText={lookupGender.lookupValue} />
        );
        var familyMember = this.props.currentEmployee.familyMember;
        var familyMemberListDetail = familyMember.map( (familyMember, index) =>
            (<TableRow key={index}>
                <TableRowColumn width={"25%"}>
                    <TextField
                        id={"family-name-"+familyMember.familyId}
                        value={familyMember.familyName}
                        disabled={true}
                        underlineShow={false}/>
                </TableRowColumn>
                <TableRowColumn width={"10%"}>
                    <SelectField
                        id={"family-gender-"+familyMember.familyId}
                        maxHeight={200}
                        value={familyMember.familyGender}
                        disabled={true}
                        underlineShow={false}>
                        {lookupGenderMenuItem}
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn width={"25%"}>
                    <DatePicker
                        id={"family-dob-"+familyMember.familyId}
                        value={familyMember.familyDob}
                        autoOk={true}
                        disabled={true}
                        underlineShow={false}
                    />
                </TableRowColumn>
                <TableRowColumn width={"15%"}>
                    <SelectField
                        id={"family-gender-"+familyMember.familyId}
                        maxHeight={200}
                        value={familyMember.familyGender}
                        disabled={true}
                        underlineShow={false}>
                        {lookupGenderMenuItem}
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn width={"5%"}>
                    <Checkbox
                      label="Simple"
                      checked={familyMember.isActive}
                      disabled={true}/>
                </TableRowColumn>
                <TableRowColumn width={"20%"}>
                    <ActionDelete color={grey500} onClick={this.deleteClick}/>
                </TableRowColumn>
            </TableRow>)
        );
        return(
            <div className="menu-content">
                <h2>Employee Family Member</h2>
                <Table>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
                        <TableRow>
                            <TableHeaderColumn width={"25%"}>Name</TableHeaderColumn>
                            <TableHeaderColumn width={"10%"}>Gender</TableHeaderColumn>
                            <TableHeaderColumn width={"25%"}>DOB</TableHeaderColumn>
                            <TableHeaderColumn width={"15%"}>Type</TableHeaderColumn>
                            <TableHeaderColumn width={"5%"}>Active</TableHeaderColumn>
                            <TableHeaderColumn width={"20%"}></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        {familyMemberListDetail}
                    </TableBody>
                </Table>
                <FloatingActionButton className="btn-add-tab-position"
                    backgroundColor={grey500}
                    onClick={this.openDialogClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

export default EmployeeTabFamilyMember;