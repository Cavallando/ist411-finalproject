import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { SketchField, Tools } from 'react-sketch';

import CustomNav from "../../components/Nav/CustomNav";
import IntroModal from "../../components/Modals/IntroModal";
import UserProfile from "../../views/UserProfile/UserProfile";
import Public from "../../views/Public/Public";
import { updateUserPaintings, updatePaintingById, getPaintingById, insertNewPainting, getUserPaintingsById, getUserById, insertNewUser, getUserByEmail } from '../../utils/PaintifyApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintColor: "#000000",
      tool: this.props.tool,
      canUndo: false,
      canRedo: false,
      controlledValue: null,
      backgroundColor: 'transparent',
      fillWithBackgroundColor: false,
      profile: {},
      userId: "",
      userPaintings: [],
      publicPaintings:[],
      paintingAvailable: false,
      currentPainting: { paintingName: null, paintingId: null, paintData: null, lastModifiedBy: null },
      showSaveModal: false,
      showSaveSuccess: false,
      renderPublic: false
    };;
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

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
    if (this._canvas.canUndo()) {
      this._canvas.undo();
    }
    this.setState({
      canUndo: this._canvas.canUndo(),
      canRedo: this._canvas.canRedo()
    });
  }
  _redoCallback = () => {
    if (this._canvas.canRedo()) {
      this._canvas.redo();
    }
    this.setState({
      canUndo: this._canvas.canUndo(),
      canRedo: this._canvas.canRedo()
    });
  }

  _createCallback = (cur) => {
    this.setState({ currentPainting: cur });
  }

  _trashCallback = () => {
    this._canvas.clear();
    this._canvas.setBackgroundFromDataUrl('');
    this.setState({
      controlledValue: null,
      backgroundColor: 'transparent',
      fillWithBackgroundColor: false,
      canUndo: this._canvas.canUndo(),
      canRedo: this._canvas.canRedo(),
      paintingAvailable: false,
      showSaveSuccess: false,
      showSaveModal:false,
      renderPublic:false,
      currentPainting: { paintingName: null, paintingId: null, paintData: null, lastModifiedBy: null, ownedBy: null }
    })
  }

  _publicCallback = (res) => {
    this.setState({renderPublic: true, publicPaintings:res});
  }

  _saveCallback = (userId, cur) => {
    var paintData = this._canvas.toJSON();
    var paintingId = cur.paintingId;
    var paintingName = cur.paintingName;

    if (paintingId) {
      //found painting
      updatePaintingById(paintingId, paintData, userId).then(res => {
        var current = { paintingName: paintingName, paintData: paintData, paintingId: res._id, ownedBy: cur.ownedBy, lastModifiedBy: null }
        getUserById(res.last_edited_by).then(res => {
          current.lastModifiedBy = res.name;
          getUserPaintingsById(userId).then(res => {
            this.setState({ showSaveSuccess: true, userPaintings:res,currentPainting: current })
          }).catch(err => {
            console.error(err);
          });
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      if (paintingName) {
        this.setState({ showSaveModal: false });
        insertNewPainting(userId, paintingName, paintData).then(res => {
          var current = { lastModifiedBy: null, ownedBy: null, paintData: paintData, paintingId: res, paintingName: paintingName };
          getUserById(res.owner_id).then(res => {
            current.ownedBy = res.name;
            getUserById(res.last_edited_by).then(res => {
              current.lastModifiedBy = res.name;
              getUserPaintingsById(userId).then(res => {
                this.setState({ showSaveSuccess: true, currentPainting: current,userPaintings: res });
              }).catch(err => {
                console.error(err);
              });
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.error(err);
        });
      } else {
        this.setState({ showSaveModal: true });
      }
    }
  }

  _loadCallback = (paintingList, cur, lastId, ownedId) => {
    if (this.state.userPaintings !== paintingList) {
      this.setState({ userPaintings: paintingList });
    }
    var current = cur;
    getUserById(ownedId).then(res => {
      current.ownedBy = res.name;
      getUserById(lastId).then(res => {
        current.lastModifiedBy = res.name;
        this.setState({ paintingAvailable: true,showSaveSuccess: true, currentPainting: current })
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  _publicCallbackTo = (cur) => {
    this.setState({renderPublic:false, currentPainting:cur});
  }
  //#endregion Callbacks



  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;
    const { currentPainting } = this.state;
    return (
      <div className="wrapper">
        {!isAuthenticated() && <IntroModal show={true} auth={this.props.auth} />}
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <CustomNav auth={this.props.auth}
            userId={this.state.userId}
            profile={profile}
            paletteCallback={this._paletteCallback}
            toolCallback={this._toolCallback}
            undoCallback={this._undoCallback}
            redoCallback={this._redoCallback}
            saveCallback={this._saveCallback}
            loadCallback={this._loadCallback}
            trashCallback={this._trashCallback}
            createCallback={this._createCallback}
            currentPainting={currentPainting}
            showSaveModal={this.state.showSaveModal}
            userPaintings={this.state.userPaintings}
            publicCallback={this._publicCallback}
            showSaveSuccess={this.state.showSaveSuccess}
            history={this.props.history} />
          <Switch>
            <Route path='/app' render={(props) => {
              return( 
                (this.state.renderPublic ===false ?
                  <SketchField
                  ref={(c) => this._canvas = c}
                  height='100%'
                  tool={this.state.tool}
                  lineColor={this.state.paintColor}
                  lineWidth={3}
                  value={currentPainting.paintData ? currentPainting.paintData : "" }
                /> : <Public auth={this.props.auth} paintingList={this.state.publicPaintings} publicCallback={this._publicCallbackTo}/>)
              );
            }} />
            <Route path="/profile" component={() => {
              return(
                !isAuthenticated() ? (
                  <Redirect to="/app" />
                ) : (
                    <UserProfile auth={this.props.auth} profile={profile}/>
                  )
              );
            }} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;


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