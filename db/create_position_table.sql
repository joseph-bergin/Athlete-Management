CREATE TABLE Position (
    positionID BIGINT PRIMARY KEY,
    athleteID BIGINT,
    positionName VARCHAR(128) NOT NULL,
    FOREIGN KEY (athleteID) REFERENCES Athlete(athleteID)
);