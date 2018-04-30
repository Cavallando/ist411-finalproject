import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {profile: this.props.profile}
  }

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
  
  render() {
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{this.state.profile.name}</h1>
          <Panel header="Profile">
            <img src={this.state.profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{this.state.profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(this.state.profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default UserProfile;