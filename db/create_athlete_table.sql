CREATE TABLE Athlete (
    athleteID BIGINT PRIMARY KEY,
    userID BIGINT,
    teamID BIGINT,
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (teamID) REFERENCES Team(teamID)
);