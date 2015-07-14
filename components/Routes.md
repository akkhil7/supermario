
  ProjectsMain
	  -> ProjectList 
    -> ProjectWrapper (RouteHandler)
      -> ProjectTemplate (default) //Project Details, no: of issues in the project, etc.
      -> IssuesWrapper (RouteHandler)
        -> IssuesMain (page of all issues)
        -> IssueWrapper
          -> IssueTemplate

    -> ProjectBlank

TeamMain
  -> TeamList (Default)
  -> TeamInviteBox
    ->TeamAddUser
