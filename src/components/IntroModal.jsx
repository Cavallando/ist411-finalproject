import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {login} from '../utils/AuthService';

class IntroModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIntro: this.props.show
        }
    }
    handleClose= ()=> {
        this.setState({showIntro: false});
    }

    handleLogin= ()=> {
        login();
    }
    render() {

        return (
            <Modal show={this.state.showIntro} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Paintify!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Paintify allows users to collaborate on shared paintings created by other users!</h4>
                    <p>You must login to edit other users paintings, however you may use the painting aspect of this app!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleLogin}>Login/Sign up</Button>
                    <Button onClick={this.handleClose}>Continue as Guest</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default IntroModal;