import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { SketchField, Tools } from 'react-sketch';

import IntroModal from './components/IntroModal';
import logo from './assets/img/logo.svg';
import './assets/css/App.css';
import { withRouter } from 'react-router-dom';
import CustomNav from './components/CustomNav';
import {isLoggedIn } from './utils/AuthService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintColor: "#000000",
      tool: Tools.Pencil,
      canUndo: false,
      canRedo: false,
    }
  }


  _paletteCallback = (color) => {
    this.setState({
      paintColor: color
    });
  }

  _toolCallback = (eventKey) => {
    var toolSelection = Tools.Pencil;
    if (eventKey == 4.1) {
      toolSelection = Tools.Select;
    } else if (eventKey == 4.2) {
      toolSelection = Tools.Pencil;
    } else if (eventKey == 4.3) {
      toolSelection = Tools.Line;
    } else if (eventKey == 4.4) {
      toolSelection = Tools.Rectangle;
    } else if (eventKey == 4.5) {
      toolSelection = Tools.Circle;
    } else if (eventKey == 4.6) {
      toolSelection = Tools.Pan;
    }
    this.setState({tool: toolSelection});
  }

  _undoCallback = () => {
    if(this._canvas.canUndo()) {
      this._canvas.undo();
    }
    this.setState({
      canUndo: this._canvas.canUndo(),
      canRedo: this._canvas.canRedo()
    });
  }
  _redoCallback = () => {
    if(this._canvas.canRedo()) {
      this._canvas.redo();
    }
    this.setState({
      canUndo: this._canvas.canUndo(),
      canRedo: this._canvas.canRedo()
    });
  }
  render() {
    const showModal = (!isLoggedIn() ? (<IntroModal show={true} />):null);
    return (
      <div>
        {showModal}
        <CustomNav paletteCallback={this._paletteCallback} 
                  toolCallback={this._toolCallback} 
                  undoCallback={this._undoCallback}
                  redoCallback={this._redoCallback}/>
        <SketchField
          ref={(c) => this._canvas = c}
          height='100%'
          tool={this.state.tool}
          lineColor={this.state.paintColor}
          lineWidth={3} />
      </div>
    );
  }
}

export default withRouter(App);
