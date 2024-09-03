CREATE TABLE Group (
    groupID BIGINT PRIMARY KEY,
    teamID BIGINT,
    groupOwnerID BIGINT,
    groupName VARCHAR(128) NOT NULL,
    FOREIGN KEY (teamID) REFERENCES Team(teamID),
    FOREIGN KEY (groupOwnerID) REFERENCES User(userID)
);