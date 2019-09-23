import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom"
import searchBus from '../src/component/searchBus'
import backupDatabase from './component/backupDatabase'
import createSeat from './component/createSeat'
import jwt_decode from 'jwt-decode'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={searchBus} />
        <Route exact path="/backupDatabase" component={backupDatabase} />
        <Route exact path='/createSeat/:id' component={createSeat} />
      </div>
    )
  }
}
export default App;
