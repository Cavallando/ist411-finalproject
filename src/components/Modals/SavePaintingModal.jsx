import React, { Component } from 'react';
import { FormGroup,FormControl, ControlLabel, Modal, Button } from 'react-bootstrap';

class SavePaintingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            show: this.props.show
        }
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    create = () => {
        this.setState({ show: false });
        this.props.navCallback(this.state.value, false);
    }

    handleChange = (e) =>{
        this.setState({ value: e.target.value });
      }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>New Painting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="formBasicText">
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter Painting Name"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button bsStyle="success" onClick={this.create}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SavePaintingModal;