

'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;
var Route         = Router.Route;

var Request       = require('superagent');
var _             = require('lodash');
var Reflux        = require('reflux');
    
var Gravatar      = require('./Gravatar.jsx');
var IssueBox      = require('./IssueBox.jsx');
var IssueSidebar  = require('./IssueSidebar.jsx');
var issueStore    = require('../store/issueStore.js');

var ProjectTemplate = React.createClass({
  
mixins: [ Router.State, Router.Navigation, Reflux.connect(issueStore)],

componentWillMount: function() {
  this.setState({
    project: undefined,
    shouldActivate: false
  })
},

shouldComponentUpdate: function(nextProps,nextState){
  //nextState and thisState returns true when 
  if(this.state.activeIssue != undefined)
    {
      if(nextState.activeIssue == this.state.activeIssue)
        return false;
      /*else if(this.state.shouldActivate == true && nextState.shouldActivate == false &&
              nextState.activeIssue !=undefined)
        {
          console.log("satisfied");
          return false; 
        }*/
          
    }
  return true;
},

componentWillUpdate: function(nextProps, nextState) {
  var _this = this
  if(this.state.shouldActivate && nextState.shouldActivate &&
     nextState.activeIssue != this.state.activeIssue)
    this.setState({
      shouldActivate: false
    }, function() {
      console.log("gonna set it to true")
    _this.setState({
      shouldActivate: true,
      activeIssue: nextState.activeIssue
    })
    _this.render();
    }
    )

},
componentDidMount: function() {
  var id = this.getParams().id;
  var url = "http://localhost:3000/projects/"+id
  var _this = this
  Request.get(url, function(res) {
    var response = JSON.parse(res.text)
    var project  = response.project
    _this.setState({
      project : project
    })
  })  

},


currentUser: function() {
  
  return new Promise(function(resolve,reject){
  var url = "http://localhost:3000/users/me";
  
  Request.get(url, function(res)
     {
      if(res.xhr.status == 200)
        resolve(res.text)
      else
        reject(Error(err))
    })
  })
  
},

addIssue: function(e) {

  var url = "http://localhost:3000/issues/"
  e.preventDefault()
  var _this = this
  var p_id = this.getParams().id;
  var issues = this.state.issues
  var issue_title = _.trim(this.refs.issue.getDOMNode().value)


 this.currentUser().then(function(response){

    response = JSON.parse(response).user
    var issue = {
      title: issue_title,
      project_id: p_id,
      assigned_to_id: response.id,
      priority: "Low"
    }

    
    issueStore.onAddIssue(issue);
    _this.refs.issue.getDOMNode().value = null

  });

  },

  
  updateIssue: function(issueBox){

    var issue = issueBox.props.issue
    var url = "http://localhost:3000/issues/"+issue.id;
    var issues = this.state.issues
    var _this = this

    Request
      .put(url)
      .send({issue: issue})
      .end(function(err,res){
        var response = JSON.parse(res.text)
        console.log(res)
        Request
          .get("http://localhost:3000/issues/")
          .end(function(res){
            var response = JSON.parse(res.text)
            console.log(res)
            _this.setState({
              issues: response.issues
            })
          })
      })
      },
 
  showIssue: function(issueBox, evt) {
    //to grab issue from IssueBox and make it the activeissue
    evt.preventDefault();
    var issue = issueBox.props.issue
    var shouldActivate = this.state.shouldActivate
    var _this = this
    this.setState({
      activeIssue: issue,
      shouldActivate: true
    })
  },

  hideIssue: function(e) {
    //to make the current issue inactive
    if(!_.isEmpty(e))
      e.preventDefault();
    var shouldActivate = this.state.shouldActivate
    this.setState({
      activeIssue: undefined,
      shouldActivate: !shouldActivate
    })

  },

  render: function() {
    var project = this.state.project
    var issues = this.state.issues
    var activeIssue = this.state.activeIssue
    var shouldActivate = this.state.shouldActivate
    var showIssueSidebar;
    var _this = this;
    

    if(!_.isEmpty(project))
      var name = project.name.toUpperCase()

    if(issues.length > 0)
      {
      var display = issues.map(function(issue){
        return <IssueBox showIssue={_this.showIssue} 
                issue={issue} 
                updateIssue={_this.updateIssue} />
                      })
      }
    
    return(
      <div className="project-template">
        <h2> pls woadrsdsdask </h2>
        <h2>{name}</h2>
        
        <div className="project-issues">
          <h3> Issues </h3>
          <hr />
          {display}
          <form onSubmit={this.addIssue}>
            <input type="text" ref="issue" placeholder="enter issue here" />
            <input type="submit" />
          </form>
        </div>
      <RouteHandler />
      </div>
    )
  }       
})

module.exports = ProjectTemplate; 
