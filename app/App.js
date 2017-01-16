import React, { Component } from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import EmployeeDetails from "./layout/EmployeeDetails"

injectTapEventPlugin();

/*class App extends Component {
  render(){
    return (
      <h1>Hello World</h1>
    );
  }
}*/

// Render the main app react component into the app div.
render(<EmployeeDetails />, document.getElementById('root'));
