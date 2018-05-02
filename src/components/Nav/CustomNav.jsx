import React, { Component } from 'react';
import { Navbar, NavDropdown, MenuItem, Nav, NavItem } from 'react-bootstrap';
import Palette from '../Palette/Palette';
import '../../assets/css/CustomNav.css'
import undoIcon from '../../assets/img/undo.png';
import redoIcon from '../../assets/img/redo.png';
import profileIcon from '../../assets/img/profile.png';
import trashIcon from '../../assets/img/trash.png';
import createIcon from '../../assets/img/create.png';
import peopleIcon from '../../assets/img/people.png';
import { updateUserPaintings, getUserByEmail, getUserPaintingsById, insertNewUser, getPaintings, getUserById } from '../../utils/PaintifyApi';
import TrashModal from '../Modals/TrashModal';
import NewPaintingModal from '../Modals/NewPaintingModal';
import SavePaintingModal from '../Modals/SavePaintingModal';

class CustomNav extends Component {
    constructor(props) {
        super(props);
        const { profile } = this.props;
        this.state = {
            userId: "",
            showTrashModal: false,
            showPaintingModal: this.props.showCreateModal,
            showSaveModal: this.props.showSaveModal,
            showSaveSuccess: this.props.showSaveSuccess,
            currentPainting: this.props.currentPainting,
            userPaintings: this.props.userPaintings,
            profile: profile
        }
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
        this.props.trashCallback(false);
    }

    _paletteCallback = (color) => {
        this.props.paletteCallback(color);
    }

    _navTrashCallback = (show) => {
        this.setState({ showTrashModal: show });
        this.props.trashCallback(show);
    }

    _navNewPaintingCallback = (name, show) => {
        var cur = this.state.currentPainting;
        cur.paintingName = name;
        this.setState({ cur, showPaintingModal: show });
        this.props.createCallback(cur, show);
    }

    _navSaveNewPaintingCallback = (name, show) => {
        var cur = this.state.currentPainting;
        cur.paintingName = name;
        this.setState({ cur, showSaveModal: show });
        this.props.saveCallback(this.state.userId, cur, show);
    }

    onSelect = (eventKey, syntheticEvent) => {
        if (eventKey === 5.3) {
            this.props.auth.logout();
        } else if (Math.trunc(eventKey) === 7) {
            if (eventKey === 7) {
                this.create();
            } else {
                var paintId = (eventKey % 1).toFixed(1) * 10;
                var cur = this.state.userPaintings[paintId - 1];
                //this.setState({currentPainting:{ paintingName:cur.painting_name, paintingId:cur._id, paintData:cur.paint_data}});
                this.props.loadCallback(this.state.userPaintings, { lastModifiedBy: null, ownedBy: null, paintingName: cur.painting_name, paintingId: cur._id, paintData: cur.paint_data }, cur.last_edited_by, cur.owner_id);
            }
        }
        this.props.toolCallback(eventKey);
    }

    trash = () => {
        this.setState({ showTrashModal: true });
    }

    create = () => {
        this.setState({ showPaintingModal: true });
    }

    save = () => {
        this.props.saveCallback(this.state.userId, this.state.currentPainting, this.state.userPaintings);
    }

    public = () => {
        this.props.publicCallback(this.state.publicPaintings);
    }

    myPaintings = () => {
        this.props.myPaintingsCallback(this.state.userPaintings);
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        var state = { ...prevState, showPaintingModal: nextProps.showCreateModal, showSaveModal: nextProps.showSaveModal, userPaintings: nextProps.userPaintings, currentPainting: nextProps.currentPainting };
        const newPainting = nextProps.currentPainting;
        const oldPainting = prevState.currentPainting;
        const newProfile = nextProps.profile;
        const oldProfile = prevState.profile;
        if (!oldProfile.name && newProfile) {
            state.profile = newProfile
        }
        return state;
    }

    componentDidUpdate(prevProps, prevState) {
        const { isAuthenticated } = this.props.auth;
        if ((prevProps.profile !== this.state.profile) && this.state.profile.name) {
            getUserByEmail(this.state.profile.email).then(res => {
                var userId = res._id;
                this.setState({ userId: res._id });
                getUserPaintingsById(res._id).then(res => {
                    const paintings = res;
                    getPaintings().then(res => {
                        var arr = [];
                        paintings.forEach(function (painting) {
                            arr.push(painting._id)
                        });
                        console.log(res);
                        this.setState({ userPaintingIdList: arr, publicPaintings: res, userPaintings: paintings });
                    }).catch(err => {
                        console.log(err);
                    });
                    var arr = [];
                    res.forEach(function (painting) {
                        arr.push(painting._id)
                    });
                    this.setState({ userPaintingIdList: arr });
                }).catch(err => {
                    console.error(err);
                });
            }).catch(err => {
                insertNewUser(this.state.profile).then(res => {
                    this.setState({ userId: res._id });
                }).catch(err => {
                    console.error(err);
                })
            });
        }
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const showLoginButton = (!isAuthenticated() ? (<NavItem eventKey={1} onClick={() => { this.props.auth.login() }}>Login/Sign up</NavItem>) :
            (<NavDropdown onSelect={this.onSelect} eventKey={5} title={<span><img alt="Profile" className="nav-icon" title="Profile" src={profileIcon}></img>  {this.props.profile.name}</span>} id="basic-nav-dropdown">
                <MenuItem eventKey={5.1} onClick={this.goTo.bind(this, 'profile')}>My Profile</MenuItem>
                <MenuItem eventKey={5.2} onClick={this.myPaintings}>My Paintings</MenuItem>
                <MenuItem eventKey={5.3} onClick={this.logout.bind(this)}>Logout</MenuItem>
            </NavDropdown>))
        var paintingItems = [];
        const paintingArr = this.state.userPaintings;
        var limit = 5
        if (paintingArr.length !== 0) {
            if (paintingArr.length < 5) {
                limit = paintingArr.length
            }
            for (var i = 0; i < limit; i++) {
                var key = 7 + ((i + 1) / 10);
                const item = (<MenuItem eventKey={key} key={key}> {paintingArr[i].painting_name} </MenuItem>);
                paintingItems.push(item);
            }
        } else {
            paintingItems.push(<MenuItem eventKey={7.0} key={7.0}>Create a new one!</MenuItem>);
        }

        return (
            <div>
                {this.state.showSaveModal && <SavePaintingModal show={true} navCallback={this._navSaveNewPaintingCallback} />}
                {this.state.showTrashModal && <TrashModal show={true} navCallback={this._navTrashCallback} />}
                {this.state.showPaintingModal && <NewPaintingModal show={true} navCallback={this._navNewPaintingCallback} />}
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {(this.state.currentPainting.paintData===null) ? <a href="app">Paintify</a> : <a>Paintify</a>}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown eventKey={3} title="Colors" id="basic-nav-dropdown">
                                <Palette paletteCallback={this._paletteCallback} />
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
                                <img src={undoIcon} alt="Undo" className="nav-icon" title="Undo" />
                            </NavItem>
                            <NavItem onClick={this.props.redoCallback}>
                                <img src={redoIcon} alt="Redo" className="nav-icon" title="Redo" />
                            </NavItem>
                            <NavItem onClick={this.save}>Save</NavItem>
                            <NavDropdown onSelect={this.onSelect} eventKey={7} title="Load" id="basic-nav-dropdown">
                                {paintingItems}
                            </NavDropdown>
                            <NavItem onClick={this.create}>
                                <img src={createIcon} alt="Create" className="nav-icon" title="Create" />
                            </NavItem>
                            <NavItem onClick={this.trash}>
                                <img src={trashIcon} alt="Trash" className="nav-icon" title="Trash" />
                            </NavItem>
                            <NavItem onClick={this.public}>
                                <img src={peopleIcon} alt="People" className="nav-icon" title="People" />
                            </NavItem>
                            <NavItem>
                                {this.state.showSaveSuccess ? <i>Successfully saved painting</i> : (this.state.currentPainting.paintingName ? <i> Now editing {this.state.currentPainting.paintingName}</i> : <i />)}
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            {showLoginButton}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
                {this.state.showSaveSuccess ? (<i>{this.state.currentPainting.paintingName } was successfully saved!</i>) : (this.state.currentPainting.ownedBy && <i>(Owned by: {this.state.currentPainting.ownedBy} Last modified by: {this.state.currentPainting.lastModifiedBy} </i>)}
            </div>
        );

    }
}

export default CustomNav;