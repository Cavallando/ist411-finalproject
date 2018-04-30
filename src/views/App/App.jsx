import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import {withRouter} from 'react-router-dom';
import IntroModal from '../../components/Modals/IntroModal';
import '../../assets/css/App.css';
import CustomNav from '../../components/Nav/CustomNav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintColor:"#000000",
      tool: Tools.Pencil,
      paintingID: -1,
      currentPainting: {},
      paintingLoaded: false,
      profile: {},
      myPaintings: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return({tool: nextProps.tool,
          paintColor: nextProps.paintColor});
  }

  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div>
        <SketchField
          ref={(c) => this._canvas = c}
          height='100%'
          tool={this.state.tool}
          lineColor={this.state.paintColor}
          lineWidth={3}
          value={this.state.paintingLoaded ? this.state.loadPainting:""} />
      </div>
    );
  }
}

export default withRouter(App);