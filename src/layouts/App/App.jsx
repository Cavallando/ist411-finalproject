import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import CustomNav from "../../components/Nav/CustomNav";

import appRoutes from "../../routes/app.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }
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

  render() {
    return (
      <div className="wrapper">
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <CustomNav auth={this.props.auth} {...this.props} />
          <Switch>
            {appRoutes.map((prop, key) => {
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (<Route path={prop.path} render={()=><prop.component auth={this.props.auth} {...this.props}/>} key={key} />);
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
