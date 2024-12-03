CREATE TABLE Athlete (
    athleteID BIGINT PRIMARY KEY,
    userID BIGINT,
    teamID BIGINT,
    position_abbreviation varchar,
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (teamID) REFERENCES Team(teamID)
);
