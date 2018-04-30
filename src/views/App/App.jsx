import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import '../../assets/css/App.css';

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

export default App;