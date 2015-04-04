'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

/* Components */
var App      = require('./components/App.jsx');
var NotFound = require('./components/NotFound.jsx');
var ProjectMain = require('./components/ProjectMain.jsx');
var ProjectBlank = require('./components/ProjectBlank.jsx');
var ProjectList = require('./components/ProjectList.jsx');
var TeamMain = require('./components/TeamMain.jsx');
var SettingsMain = require('./components/SettingsMain.jsx');
var TeamInviteBox = require('./components/TeamInviteBox.jsx');
var TeamAddUser   = require('./components/TeamAddUser.jsx');
var TeamList      = require('./components/TeamList.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="projects" path="/projects/" handler={ProjectMain} >
      <DefaultRoute name="projectlist" handler={ProjectList} />
      <Route name="newproject" path="/projects/new" handler={ProjectBlank} />
    </Route>
    <Route name="team" path="/team" handler={TeamMain}>
      <DefaultRoute name="teamlist" path="/team/all" handler={TeamList} />
      <Route name="invite" path="/team/invite" handler={TeamInviteBox} >
        <Route name="addmember" path=":id" handler={TeamAddUser} />
      </Route>
    </Route>
    <Route name="settings" path="/settings" handler={SettingsMain} />
      {/*<Route name="project" path="/:projectid/" handler={ProjectTemplate} >
        <Route name="issues" path="/:projectid/issues" handler={IssueMain} >
          <Route name="issue" path="/:issueid" handler={IssueTemplate} />
        </Route>
      </Route>
    </Route>
    */}
    <NotFoundRoute name="notfound" handler={ NotFound }/>
  </Route>
);

module.exports = routes;
