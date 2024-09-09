CREATE TABLE CatapultData (
    catapultDataID BIGINT PRIMARY KEY,
    athleteID BIGINT,
    dataDate DATE NOT NULL,                    
    totalPlayerLoad FLOAT,                 
    explosiveYards FLOAT,                   
    playerLoadPerMin FLOAT,               
    totalHighIMA FLOAT,                    
    totalDistance FLOAT,                   
    maximumVelocity FLOAT,                  
    FOREIGN KEY (athleteID) REFERENCES Athlete(athleteID) 
);
