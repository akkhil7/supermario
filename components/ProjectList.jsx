'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')

//import components
var ProjectBox    = require('./ProjectBox.jsx');

var ProjectList = React.createClass({
  mixins : [Router.Navigation],
  getInitialState: function(){
    return { 
      projects: []
    }
  },

  componentDidMount: function () {
    var _this = this;
    var url   = "http://localhost:3000/projects"
    Request.get(url, function (res) {
      var response = JSON.parse(res.text);
      /** _asynchronous and synchronous js code _. when the req is sent, rest of the code won't wait for the req completion. it'll run and it'll transition
      /* to the other component. what was happening was you had already transitioned then it tried to change the state and add projects but that
      /* component wasn't there now 

      **/
      if (_this.isMounted()) {
        _this.setState({
          projects: response.projects
        })
        if (response.projects.length === 0) {
          this.transitionTo('projectsNew')
        }
      }
    })
  },

  addProject: function () {
    var _this = this;
    var project = {
      name: this.refs.name.getDOMNode().value
    };

    if (_.trim(project.name) === "") {
      return alert("Project name can't be empty!")
    }
    var url = 'http://localhost:3000/projects'
    var _this = this;

    Request
    .post(url)
    .send({ project: project })
    .end(function (err, res){
      console.log(res);
      var response = JSON.parse(res.text);
      _this.addedProjectOffline(response);
     })
  }, 
  addedProjectOffline: function (project) {
    var projects = this.state.projects;
    projects.push(project);
    this.setState({
      projects: projects
    })
  },

  deleteProject: function(project) {
    var index=-1;
    var search=project.id;
    var projects = this.state.projects;
    for(var i=0; i<projects.length; i++)
    {
      if(projects[i].id==search)
        {
         index=i;
         break;
       }
    }
    projects.splice(index,1);
    this.setState({
      projects: projects
    });
    if(projects.length===0)
      this.transitionTo('newproject');
  },

  render: function() {
    var _this = this;
    var projects = this.state.projects;
    if(projects.length>0){
      var display = <div className="project-list">
                    Projects ({projects.length})
                    {projects.map(function(project){
                    return <ProjectBox deleted={_this.deleteProject} project={project} />
                    })}
                    </div>
    }

    return (
      <div className="projectswrapper">    
        {display}
      </div>
    );
  }

});

module.exports = ProjectList;
