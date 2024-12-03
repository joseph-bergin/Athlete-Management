CREATE TABLE Athlete (
    athleteID BIGINT PRIMARY KEY,
    userID BIGINT,
    teamID BIGINT,
    position_abbreviation CHAR(4),
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (teamID) REFERENCES Team(teamID)
);
