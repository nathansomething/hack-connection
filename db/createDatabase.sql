use HackATeam;
create table People (
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	fullname varchar(50),
    email varchar(50),
    phone INT(50),
    interests TEXT,
    techBackground TEXT,
    bio TEXT,
    words TEXT,
    seriousness int
);

create table Matches(
    pname int NOT NULL,
    FOREIGN KEY (pname) REFERENCES
    People(fullname),
    match_name int NOT NULL,
    FOREIGN KEY (match_name) REFERENCES
    People(fullname)    
    ON DELETE CASCADE,
    rank int
    
    ON DELETE CASCADE
);
/*
INSERT INTO People
(fullname, email, phone, words)
VALUES
("Firstname Lastname", "myname@me.net", 7654321, "I want to make this awesome project and I know how to do lots of stuff");

*/