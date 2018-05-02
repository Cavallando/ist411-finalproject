import React, { Component } from 'react';
import { ListGroup, ListGroupItem, } from 'react-bootstrap';
import {getPaintings, getUserById} from '../../utils/PaintifyApi';

class Paintings extends Component {
    constructor(props) {
        super(props);
        this.state = {myPaintings:this.props.myPaintings,paintingList:this.props.paintingList}
    }

    render() {
        var group = [];
        const paintings = this.state.paintingList.length===0 ? this.state.myPaintings : this.state.paintingList;
        const showNo = paintings.length === 0;
        const owners = this.state.owners;
        if(showNo) {
            group.push(<ListGroupItem key={0} onClick={this.props.publicCallback.bind(this, null, true)} header="You have no paintings!">Click here to create one!</ListGroupItem>);
        } else {
            var i=0;
            paintings.forEach(painting => {
                group.push(<ListGroupItem key={i} onClick={this.props.publicCallback.bind(this, painting, false)} header={painting.painting_name}></ListGroupItem>)
                i++;
            });
        }
        return (
            <div>
                <ListGroup>
                    {group}
                </ListGroup>
            </div>
        );
    }
}

export default Paintings;
