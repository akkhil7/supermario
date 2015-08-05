'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

/* Components */
var App             = require('./components/App.jsx');
var NotFound        = require('./components/NotFound.jsx');
var IssuesMain      = require('./components/IssuesMain.jsx');
var IssueTemplate   = require('./components/IssueTemplate.jsx');
var IssuesWrapper   = require('./components/IssuesWrapper.jsx');
var IssueWrapper    = require('./components/IssueWrapper.jsx');
var ProjectMain     = require('./components/ProjectMain.jsx');
var ProjectBlank    = require('./components/ProjectBlank.jsx');
var ProjectList     = require('./components/ProjectList.jsx');
var ProjectTemplate = require('./components/ProjectTemplate.jsx');
var ProjectWrapper  = require('./components/ProjectWrapper.jsx');      
var TeamMain        = require('./components/TeamMain.jsx');
var SettingsMain    = require('./components/SettingsMain.jsx');
var TeamInviteBox   = require('./components/TeamInviteBox.jsx');
var TeamAddUser     = require('./components/TeamAddUser.jsx');
var TeamList        = require('./components/TeamList.jsx');
var RegisterMain    = require('./components/RegisterMain.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>

    <Route name="projects" path="/projects/" handler={ProjectMain} >
      <DefaultRoute name="projectlist" handler={ProjectList} />
      
      <Route name="projectwrapper" path=":id/" handler={ProjectWrapper}>
        <DefaultRoute name="project" handler={ProjectTemplate} />
        <Route name="issueslist" path="issues" handler={IssuesWrapper} >
          <DefaultRoute name="issues" handler={IssuesMain} />
          <Route name="issuewrapper" path=":id/" handler={IssueWrapper} >
            <DefaultRoute name="issue" handler={IssueTemplate} />
          </Route>
        </Route>
      </Route>
      
      <Route name="newproject" path="/projects/new" handler={ProjectBlank} />
      
    </Route>
    
    <Route name="team" path="/team" handler={TeamMain}>
      <DefaultRoute name="teamlist" handler={TeamList} />
      <Route name="invite" path="/team/invite" handler={TeamInviteBox} >
        <Route name="addmember" path=":id/" handler={TeamAddUser} />
      </Route>
    </Route>
    
    <Route name="settings" path="/settings" handler={SettingsMain} />
    <Route name="register" path='/register' handler={RegisterMain} />
    <NotFoundRoute name="notfound" handler={ NotFound }/>
    <Redirect from='issues' to='project' />
  </Route>
);

module.exports = routes;
