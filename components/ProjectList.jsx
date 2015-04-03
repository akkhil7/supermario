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
  getInitialState: function(){
    return { 
      projects: this.props.projects
    }
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
      _this.props.added(response);
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
  },

  render: function() {
    var _this = this;
    var projects = this.props.projects;
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
        <div className="add-a-project">
          <input type="text" placeholder="Name your project" ref="name" />

          <button onClick={this.addProject}>Add this project</button>
          <button className="white" onClick={this.props.cancel}>Cancel</button> 

        </div>
      </div>
    );
  }

});

module.exports = ProjectList;