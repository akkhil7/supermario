'use strict';

var React         = require('react');
var Router        = require('react-router');
var Request       = require('superagent');
var crypto        = require('crypto');




var Gravatar = React.createClass({

  render: function(){
  var email = this.props.email;
    if (email !== null)
     {
   var hash = crypto.createHash("md5").update(email).digest("hex");
   var src  = "http://www.gravatar.com/avatar/" + hash +"?s=150" +"&d=retro";
    }
  return(
    <div className="gravatar">
    <img src={src} />
    </div>
    );
  }
});

module.exports = Gravatar;