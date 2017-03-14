import React, { Component } from 'react';
import update from 'react-addons-update';

import {render} from 'react-dom';

import Header from "../component/common/Header"

import EmployeeToolbar from "../component/containers/employee/EmployeeToolbar"
import EmployeeList from "../component/containers/employee/EmployeeList"

class EmployeeDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        this.props.getLookupByTpe('statusMarital');
        this.props.getLookupByTpe('gender');
        this.props.getLookupByTpe('status');
        this.props.getLookupByTpe('grade');
        this.props.getLookupByTpe('division');
        this.props.getLookupByTpe('familyType');
        this.props.getLookupByTpe('location');
    }

    componentDidMount = () => {
        this.props.loadEmployeeData(0,'');
    }

    render = () => {
        return(
            <div>
                <Header/>
                <EmployeeToolbar />
                <EmployeeList />
            </div>
        )
    }
}

export default EmployeeDetails;