import React, { Component } from 'react';
import ReactPaint from 'react-paint';
  
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paintColor: this.props.paintColor
        }
    }
    render() {
        const props = {
            style: {
              background: 'tomato',
              /* Arbitrary css styles */
            },
            brushCol: this.props.paintColor,
            lineWidth: 10,
            className: 'react-paint',
            height: 1000,
            width: 1000,
            onDraw: () => { console.log(this.state.paintColor); },
          };
        return (
            <div>
                <ReactPaint {...props}/>
            </div>
        );
    }
}

export default Canvas;