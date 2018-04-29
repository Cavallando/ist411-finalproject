import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';

import IntroModal from './components/IntroModal';
import './assets/css/App.css';
import CustomNav from './components/CustomNav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintColor: "#000000",
      tool: Tools.Pencil,
      canUndo: false,
      canRedo: false,
      paintingID: -1,
      currentPainting: {},
      paintingLoaded: false,
      profile: {},
      myPaintings: []
    }
  }

  _paletteCallback = (color) => {
    this.setState({
      paintColor: color
    });
  }

  _toolCallback = (eventKey) => {
    var toolSelection = Tools.Pencil;
    if (eventKey === 4.1) {
      toolSelection = Tools.Select;
    } else if (eventKey === 4.2) {
      toolSelection = Tools.Pencil;
    } else if (eventKey === 4.3) {
      toolSelection = Tools.Line;
    } else if (eventKey === 4.4) {
      toolSelection = Tools.Rectangle;
    } else if (eventKey === 4.5) {
      toolSelection = Tools.Circle;
    } else if (eventKey === 4.6) {
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

  _trashCallback = () => {
  }

  _saveCallback = () => {
    this.state.myPaintings.push(this._canvas.toJSON());
  }

  _loadCallback = (id) => {
    this.api.getPaintingById(id).then( (result) => this.setState({currentPainting: result.paint_data}));
    if(this.state.currentPainting !== {}) {
      this.setState({paintingLoaded:true});
    }
  }

  render() {
    const {isAuthenticated} = this.props.auth;
    const showModal = (!isAuthenticated() ? (<IntroModal auth={this.props.auth} show={true} />):null);
    return (
      <div>
        {showModal}
        <CustomNav auth={this.props.auth}
                  profile={this.state.profile}
                  paletteCallback={this._paletteCallback} 
                  toolCallback={this._toolCallback} 
                  undoCallback={this._undoCallback}
                  redoCallback={this._redoCallback}
                  saveCallback={this._saveCallback}
                  loadCallback={this._loadCallback}/>
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

export default App;
