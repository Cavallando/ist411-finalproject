import React, { Component } from 'react';

class Canvas extends Component {


    render() {

        return (
            <div>
                <div>
                    <canvas id="palette" width="100" height="20"></canvas>
                </div>
                <br />
                <div>
                    <canvas id="canvas" width="1000" height="1000"></canvas>
                </div>
            </div>

        );
    }


}

export default Canvas;