var Reflux = require('reflux')

var issuesActions = Reflux.createActions(
  ["addIssue", "updateIssue", "findIssue"]
);

module.exports = issuesActions
