var Reflux = require('reflux');
var Request = require('superagent');

var projectsStore = Reflux.createStore({
  data:{
    projects:[]
  },

  init: function(){
   var _this = this;
    var url   = "http://localhost:3000/projects"
    Request.get(url, function (res) {
      var response = JSON.parse(res.text);
      _this.data.projects = response.projects
      _this.trigger(_this.data)
    })
 
  },

 getInitialState: function(){
   return this.data;
 },

})

module.exports = projectsStore;
