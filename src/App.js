import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Pixel from './components/Pixel/Pixel';
import {Container, Row, Col} from 'react-grid-system';
import Palette from './components/Palette/Palette';
import Canvas from './components/Canvas/Canvas';
class App extends Component {
  state = {
    paintColor: "#FFFFFF"
  }

  paletteCallback = (color) => {
    this.setState({
      paintColor: color
    });
  }

  render() {
    return(
      <div>
        <Palette callbackFromApp={this.paletteCallback} />
        <Canvas paintColor={this.state.paintColor} />
      </div>
    );  
  }
}

export default App;
