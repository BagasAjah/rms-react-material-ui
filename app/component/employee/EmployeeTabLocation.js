import React, {Component} from 'react';

import EmployeeLocationDetail from "./EmployeeLocationDetail"
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';

import ContentAdd from 'material-ui/svg-icons/content/add';

class EmployeeTabLocation extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        var locationList = this.props.currentEmployee.location;
        var familyLocationDetail = locationList.map((locationList, locationIndex) => (
            <EmployeeLocationDetail
                key={locationIndex}
                index={locationIndex}
                location={locationList}
                viewMode={this.props.viewMode}/>
        ));
        return (
            <div className="menu-content">
                <h2>Employee Location Details</h2>
                {(familyLocationDetail.length == 0) ?
                    <div style={{textAlign: 'center'}}>Location Details Found</div>
                :
                    (<List >
                            {familyLocationDetail}
                    </List>)
                }
                <FloatingActionButton className="btn-add-tab-position"
                    secondary={true}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

export default EmployeeTabLocation;
