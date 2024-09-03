CREATE TABLE Coach (
    coachID BIGINT PRIMARY KEY,
    userID BIGINT,
    teamID BIGINT,
    positionGroup VARCHAR(128),
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (teamID) REFERENCES Team(teamID)
);