import React, { Text, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect } from 'react-konva';
import Canvas from './components/Canvas/Canvas';
import Palette from './components/Palette/Palette';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintColor: "#FFFFFF"
    };
  }

  paletteCallback = (color) => {
    this.setState({
      paintColor: color
    });
  }

  render() {
    return (
      <div>
        <div>
          <Palette callbackFromApp={this.paletteCallback} />
          <Canvas paintColor={this.state.paintColor} />
        </div>
      </div>
    );
  }
}

export default App;
