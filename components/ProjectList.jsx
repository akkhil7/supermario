'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var Request       = require('superagent')
var _             = require('lodash')
var Reflux        = require('reflux')
var projectsStore = require('../store/projectsStore.js')
var ProjectBox    = require('./ProjectBox.jsx');

var ProjectList = React.createClass({
  mixins : [Router.Navigation, Reflux.connect(projectsStore)],

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
    var projects = this.state.projects

    Request
    .post(url)
    .send({ project: project })
    .end(function (err, res){
      console.log(res);
      var response = JSON.parse(res.text);
      projects.push(response)
      _this.setState({
        projects: projects
      })
     })
  }, 

  deleteProject: function(childComponent) {

    var index = -1;
    var search = childComponent.props.project.id;
    var projects = this.state.projects;
    var _this = this
    var url      = "http://localhost:3000/projects/"
    
    Request
    .del(url+search)
    .type('json')
    .end(function(err, res){
      console.log(res);
      var response = JSON.parse(res.text);

      for(var i=0; i<projects.length; i++)
        {
          if(projects[i].id==search)
            {
              index=i;
              console.log("Index: "+index)
              _.pullAt(projects, index)
              _this.setState({
                projects: projects
              })
              break;
            }
        }
      })

      console.log(projects.length)
      
    this.setState({
      projects: projects
    })

    if(projects.length===0)
      this.transitionTo('newproject');

  },

  render: function() {
    var _this = this;
    var projects = this.state.projects;
    console.log(projects)
    if(true){
      var display = projects.map(function(project){
                    return <ProjectBox deleted={_this.deleteProject} project={project} />
                    })
    }

    return (
    <div className="projectswrapper"> 
      <div className="project-list">
                    <h2> Projects </h2> 
                    <Link to="newproject"><button> Add Project </button></Link>
                    <hr />
        {display}
      </div>
    </div>
    );
  }

});

module.exports = ProjectList;
