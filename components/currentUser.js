var Request = require('superagent');
var _       = require('lodash');

function currentUser(){
  var url = "http://localhost:3000/users/me";
  Request.get(url, function(res) {
    var response = JSON.parse(res.text);
    return response;
  })
}
