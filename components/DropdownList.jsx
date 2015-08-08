"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var DropdownItem  = require('./DropdownItem.jsx');

var DropdownList = React.createClass({

  handleClick: function(item,e){
    this.props.onAddUser(item,e)
  },

  render: function() {
    var status = this.props.status
    var results = this.props.results
    if(status)
      { if(results.length > 0)
        { var _this = this
          var display = results.map(function(user){
            return <DropdownItem user={user} onAddUser={_this.handleClick} />
          })
        }
        else
          var display = <li> Cannot find any match </li>
      }

    return (
          <div className="dropdown">
            <ul id='dropdown-list'>{display}</ul>
          </div>  
        );
}});

module.exports = DropdownList;
