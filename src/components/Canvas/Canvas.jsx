import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Pixel from '../Pixel/Pixel';
import {Container, Row, Col} from 'react-grid-system';

class Canvas extends Component {
  state = {
    paintColor: "blue",
    pixels: []
  }

  canvasCallback = (key) => {
    this.state.pixels[key] = <Pixel paintColor={this.state.paintColor} />;
  }

  componentDidMount() {
    var pixels = []
    var ukey=0;
    for(var i=0; i<100; i++) {
      for(var j=0; j<100; j++) {
        pixels.push(<Pixel key={ukey} x={i*10} y={j*10} width={10} height={10} paintColor={this.props.paintColor} callbackFromCanvas={this.canvasCallback}/>);
        ukey++;
      }
    }
    this.setState({
      pixels: pixels
    });
  }

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {this.state.pixels}
        </Layer>
      </Stage>
      
    );
  }
}

export default Canvas;
