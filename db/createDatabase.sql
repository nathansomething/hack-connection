use HackATeam;
create table People (
	fullname varchar(50) PRIMARY KEY,
    email varchar(50),
    phone INT(50),
    interests TEXT,
    techBackground TEXT,
    bio TEXT,
    words TEXT,
    competitiveness int
);

create table Matches(
	match_rank int,
    pname varchar (50) NOT NULL,
    match_name varchar(50) NOT NULL,
    FOREIGN KEY (pname) REFERENCES
    People(fullname),
    
    FOREIGN KEY (match_name) REFERENCES
    People(fullname)    
    ON DELETE CASCADE
);
/*
INSERT INTO People
(fullname, email, phone, interests, techBackground, bio, words, seriousness)
VALUES
("Firstname Lastname", "myname@me.net", 7654321, "I want to make this awesome project", "I know how to do lots of stuff", "I was born awesome and I'm still awesome", "{word stuff}", .4);

*/