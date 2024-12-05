
export interface CatapultData {
    athleteID: number;
    dataDate: Date;
    totalPlayerLoad: number;
    explosiveYards: number;
    playerLoadPerMin: number;
    totalHighIMA: number;
    totalDistance: number;
    maximumVelocity: number;
}

export interface Athlete {
    athleteID: number;
    teamID: number;
    first_name: string;
    last_name: string;
    year: string;
    position_abbreviation: string;
  }

export interface CatapultDataEntry {
    athleteID: number;
    athleteName: string;
    dataDate: Date;
    totalPlayerLoad: number;
    explosiveYards: number;
    playerLoadPerMin: number;
    totalHighIMA: number;
    totalDistance: number;
    maximumVelocity: number;
}

export interface AthleteDataEntry {
    athleteID: number;
    firstName: string;
    lastName: string;
    position_abbreviation: string;
    year: string;
}