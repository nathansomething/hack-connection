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
/*
INSERT INTO People
(fullname, email, phone, idea, frontend, backend, machineLearn, design, mobileApps, games, hardware, analytics, python, java, javascript, HTML_CSS, C, Cpp, Csharp)
VALUES
("Firstname Lastname", "myname@me.net", 7654321, "I want to make this awesome project", True, True, True, True, True, True, True, True, True, True, True, True, True, True, True);

*/