var Reflux = require('reflux')

var issuesActions = Reflux.createActions(
  ["addIssue", "updateIssue"]
);

module.exports = issuesActions
