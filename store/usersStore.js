var Reflux = require('reflux');
var Request = require('superagent');
var _  = require('lodash');


var usersStore = Reflux.createStore({
  data: {users: []},

  init: function(){
    var _this = this

    Request.get("http://localhost:3000/users/", function(res){
      var response = JSON.parse(res.text);
      var users = response.users;
      _this.data.users = users;
      _this.trigger(_this.data)
    })
  },

  getInitialState: function(){
    return this.data
  }

})

module.exports = usersStore;
