CREATE TABLE Team (
    teamID BIGINT PRIMARY KEY,
    teamOwnerID BIGINT,
    teamName VARCHAR(128) NOT NULL,
    FOREIGN KEY (teamOwnerID) REFERENCES User(userID)
);