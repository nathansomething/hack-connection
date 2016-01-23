use HackATeam;
create table People (
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	fullname varchar(50),
    email varchar(50),
    phone INT(50),
    idea TEXT, 
    
    /*interests*/
    frontend BOOL,
    backend BOOL,
    machineLearn BOOL,
    design BOOL, 
    mobileApps BOOL,
    games BOOL,
    hardware BOOL,
    analytics BOOL,
    
    
    /*languages*/
    python BOOL,
    java BOOL,
    javascript BOOL,
    HTML_CSS BOOL,
    C BOOL,
    Cpp BOOL,
    Csharp BOOL     
);
