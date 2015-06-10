"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var DropdownList = React.createClass({
  getInitialState: function(){
    return {
      status: this.props.status,
      results: this.props.results
    }
  },

  render: function() {
    if(status)
      { if(results.length > 0)
        { var _this = this
          var results = this.state.results
          var display = results.map(function(user){
            return(
              <a class="item">
                <li>@{_this.user.username}</li>
                <p>{_this.user.email} </p>
              </a>
            );
          })
        }
        else
          var display = <li> Cannot find any match </li>
        return (
          <div className="dropdown">
            <ul id='dropdown-list'>{display}</ul>
          </div>  
        );
      }
      else
        return(
          <div className="dropdown">
          </div>
        )
}});

module.exports = DropdownList;
