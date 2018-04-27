import React, {Component} from 'react';
import { Rect} from 'react-konva';
import Konva from 'konva';

class Pixel extends Component {
    constructor(props) {
        super(props);
        this.state = {color: "white"}
    }

    handleClick = () => {
        this.setState({
            color: this.props.paintColor
        });
        this.props.callbackFromCanvas(this.props.key);
    }
    
    getDerivedStateFromProps = (nextProps, prevState) => {
        this.setState({
            color: nextProps.paintColor
        });
    }

    render() {

        return(
            <Rect
              x={this.props.x}
              y={this.props.y}
              width={this.props.width}
              height={this.props.height}
              fill={this.state.color}
              stroke={"black"}
              onClick={this.handleClick}
            />
        );
    }

}

export default Pixel;