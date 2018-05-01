import React, { Component } from 'react';
import { ListGroup, ListGroupItem, } from 'react-bootstrap';
import {getPaintings, getUserById} from '../../utils/PaintifyApi';

class Public extends Component {
    constructor(props) {
        super(props);
        this.state = {paintingList:this.props.paintingList}
    }

    render() {
        var group = [];
        const paintings = this.state.paintingList;
        const owners = this.state.owners;
        if(paintings.length===0) {
            group.push(<ListGroupItem key={0} onClick={this.props.publicCallback.bind(this, null)} header="Nothing to see here">Click to go back</ListGroupItem>);
        } else {
            var i=0;
            paintings.forEach(painting => {
                group.push(<ListGroupItem key={i} onClick={this.props.publicCallback.bind(this, painting)} header={painting.painting_name}></ListGroupItem>)
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

export default Public;
