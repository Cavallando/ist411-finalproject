import React, { Component } from 'react';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import { Button, Navbar, NavDropdown, MenuItem, Nav, NavItem } from 'react-bootstrap';
import Palette from './Palette';
import { withRouter } from 'react-router-dom';

import '../assets/css/CustomNav.css'
import undoIcon from '../assets/img/undo.png';
import redoIcon from '../assets/img/redo.png';
import profileIcon from '../assets/img/profile.png';

class CustomNav extends Component {
    constructor(props) {
        super(props);
    }

    paletteCallback = (color) => {
        this.props.paletteCallback(color);
    }

    onSelect = (eventKey, syntheticEvent) => {
        if(eventKey==5.1) {

        } else if(eventKey==5.2) {

        } else if(eventKey==5.3) {
            this.props.history.push(logout());
        }
        this.props.toolCallback(eventKey);
    }


    render() {
        const showLoginButton = (!isLoggedIn() ? (<NavItem eventKey={1} onClick={() => login()}>Login/Sign up</NavItem>) : (<NavDropdown onSelect={this.onSelect} eventKey={5} title={<span><img className="nav-icon" title="Profile" src={profileIcon}></img> Profile</span>} id="basic-nav-dropdown"><MenuItem eventKey={5.1}>My Profile</MenuItem><MenuItem eventKey={5.2}>My Paintings</MenuItem><MenuItem eventKey={5.3}>Logout</MenuItem></NavDropdown>))

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">Paintify</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Colors" id="basic-nav-dropdown">
                            <Palette callbackFromApp={this.paletteCallback} />
                        </NavDropdown>
                        <NavDropdown onSelect={this.onSelect} eventKey={4} title="Tools" id="basic-nav-dropdown">
                            <MenuItem eventKey={4.1}>Select</MenuItem>
                            <MenuItem eventKey={4.2}>Pencil</MenuItem>
                            <MenuItem eventKey={4.3}>Line</MenuItem>
                            <MenuItem eventKey={4.4}>Rectangle</MenuItem>
                            <MenuItem eventKey={4.5}>Circle</MenuItem>
                            <MenuItem eventKey={4.6}>Pan</MenuItem>
                        </NavDropdown>
                        <NavItem onClick={this.props.undoCallback}>
                            <img src={undoIcon} className="nav-icon" title="Undo" />
                        </NavItem>
                        <NavItem onClick={this.props.redoCallback}>
                            <img src={redoIcon} className="nav-icon" title="Redo" />
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        {showLoginButton}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }
}

export default withRouter(CustomNav);