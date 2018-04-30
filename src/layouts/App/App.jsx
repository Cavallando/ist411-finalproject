import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import CustomNav from "../../components/Nav/CustomNav";
import { Tools } from 'react-sketch';
import appRoutes from "../../routes/app.jsx";
import IntroModal from "../../components/IntroModal/IntroModal";
import UserProfile from "../../views/UserProfile/UserProfile";
import AppView from "../../views/App/App";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  initState() {
    var state = { paintColor: "#000000", tool: this.props.tool, profile: {} };
    const { isAuthenticated, userProfile, getProfile } = this.props.auth;
    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          state.profile = profile;
        });
      } else {
        state.profile = userProfile;
      }
    }
    return state;
  };

  //#region Callbacks

  _paletteCallback = (color) => {
    this.setState({ paintColor: color });
  }

  _toolCallback = (eventKey) => {
    var toolSelection = Tools.Pencil;
    if (eventKey === 4.1) {
      toolSelection = Tools.Select;
    } else if (eventKey === 4.2) {
      toolSelection = Tools.Pencil;
    } else if (eventKey === 4.3) {
      toolSelection = Tools.Line;
    } else if (eventKey === 4.4) {
      toolSelection = Tools.Rectangle;
    } else if (eventKey === 4.5) {
      toolSelection = Tools.Circle;
    } else if (eventKey === 4.6) {
      toolSelection = Tools.Pan;
    }
    this.setState({ tool: toolSelection });
  }

  _undoCallback = () => {
    if (this._app._canvas.canUndo()) {
      this._app._canvas.undo();
    }
    this.setState({
      canUndo: this._app._canvas.canUndo(),
      canRedo: this._app._canvas.canRedo()
    });
  }
  _redoCallback = () => {
    if (this._app._canvas.canRedo()) {
      this._app._canvas.redo();
    }
    this.setState({
      canUndo: this._app._canvas.canUndo(),
      canRedo: this._app._canvas.canRedo()
    });
  }

  _trashCallback = () => {
  }

  _saveCallback = () => {
    this.state.myPaintings.push(this._canvas.toJSON());
  }

  _loadCallback = (id) => {

    if (this.state.currentPainting !== {}) {
      this.setState({ paintingLoaded: true });
    }
  }
  //#endregion Callbacks

  componentWillMount() {
    const { isAuthenticated, userProfile, getProfile } = this.props.auth;

    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({profile:profile});
        });
      } else {
        this.setState({profile:userProfile});
      }
    }
  }
  //!isAuthenticated() && <IntroModal show={true} auth={this.props.auth} />}
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="wrapper">
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <CustomNav auth={this.props.auth}
            profile={this.state.profile}
            paletteCallback={this._paletteCallback}
            toolCallback={this._toolCallback}
            undoCallback={this._undoCallback}
            redoCallback={this._redoCallback}
            saveCallback={this._saveCallback}
            loadCallback={this._loadCallback}
            {...this.props} />
          <Switch>
              <Route path='/app' render={() => {
                  //handleAuthentication(props);
                  if(localStorage.getItem('access_token') && localStorage.getItem('id_token'))
                    this.props.auth.handleAuthentication();
                  return(<AppView auth={this.props.auth} tool={this.state.tool} paintColor={this.state.paintColor} {...this.props} />);
              }}/>
              {isAuthenticated() ?
              <Route path='/user' render={(props) => {
                    return(<UserProfile auth={this.props.auth} profile={this.state.profile} tool={this.state.tool} paintColor={this.state.paintColor} {...this.props} />);
                }}/> :
                <Redirect to='/app' />
                }
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);


//Old Code
/*
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }*/