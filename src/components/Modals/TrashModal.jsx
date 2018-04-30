import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class TrashModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        }
    }
    
    handleClose= ()=> {
        this.setState({show: false});
    }

    delete = () => {
        this.setState({show: false});
        this.props.navCallback();
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        return ({show: nextProps.show});
    }
    
    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to throw all your hard work in the trash? </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button bsStyle="danger" onClick={this.delete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default TrashModal;