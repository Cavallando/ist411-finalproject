import React from 'react';
import { TwitterPicker } from 'react-color';

class Palette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#fff'
        };
    }

  handleChangeComplete = (color, event) => {
    this.setState({ color: color.hex});
    this.props.paletteCallback(this.state.color);
  };

  render() {
    return <TwitterPicker color={this.state.color} hide={true} onChangeComplete={this.handleChangeComplete} />;
  }
}

export default Palette;