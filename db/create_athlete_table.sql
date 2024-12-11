CREATE TABLE Athlete (
    athleteID BIGINT PRIMARY KEY,
    teamID BIGINT,
    first_name VARCHAR(128)
    last_name VARCHAR(128)
    position_abbreviation CHAR(4),
    FOREIGN KEY (teamID) REFERENCES Team(teamID)
);
