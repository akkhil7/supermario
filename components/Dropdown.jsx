"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var DropdownList  = require('./DropdownList.jsx');
var Request  = require('superagent');

String.prototype.contains=function(str){
      if (this.indexOf(str)!==-1)
        return true;
      else
        return false;
}

var Dropdown = React.createClass({

getInitialState: function() {
  return {
    data: [],
    status: false
  }
},

componentDidMount: function(){

  var url = "http://localhost:3000/users"
  var _this = this
  Request
  .get(url)
  .end(function(err,res){
    var response = JSON.parse(res.text)
    response = _.values(response) // convert object to array
    _this.setState({
      data: response
    })
  })

},

findMatch: function(e) {
  var box = this.refs.dropdown.getDOMNode().value;
  if(box != "")
    {
      this.setState({
        status: true
      })
    }
  else
    {
      this.setState({
        status: false
      })
    }

    /* variables initilization */
    var results = [];
    if(this.isMounted())
      var data = this.state.data;
    
    for(var i=0;i<data.length;i++)
    { var user=data[i];
      if(user.username.contains(str) || user.email.contains(str))
        results.push(user);
    }
    console.log(results);
    
  },


  render: function() {
    return (
      <div className="genesis">
        <input type="text" placeholder="enter something" ref="dropdown" id="input" autoComplete="off" onKeyPress={this.findMatch} />
        <DropdownList status = {this.state.status} results={this.state.results}/>
      </div>
      );
  }
});

module.exports = Dropdown;
