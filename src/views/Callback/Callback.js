import React, { Component } from 'react';
import loading from '../../assets/img/loading.svg';
import {Redirect,withRouter} from 'react-router-dom';

class Callback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Redirect to="/app" auth={this.props.auth}/>;
  }
}


export default withRouter(Callback);