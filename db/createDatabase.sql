use HackATeam;
create table People (
	--ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	fullname varchar(50),
    email varchar(50),
    phone INT(50),
    interests TEXT,
    techBackground TEXT,
    bio TEXT,
    words TEXT,
    competitiveness int
);

create table Matches(
    pname int NOT NULL,
    FOREIGN KEY (pname) REFERENCES
    People(fullname),
    match_name int NOT NULL,
    FOREIGN KEY (match_name) REFERENCES
    People(fullname)    
    ON DELETE CASCADE,
    match_rank int
);
/*
INSERT INTO People
(fullname, email, phone, interests, techBackground, bio, words, seriousness)
VALUES
("Firstname Lastname", "myname@me.net", 7654321, "I want to make this awesome project", "I know how to do lots of stuff", "I was born awesome and I'm still awesome", "{word stuff}", .4);

*/