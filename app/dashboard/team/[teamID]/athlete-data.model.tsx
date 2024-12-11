export interface Athlete {
    athleteID: number;
    teamID: number;
    first_name: string;
    last_name: string;
    year: string;
    position_abbreviation: string;
  }

export interface AthleteDataEntry {
    athleteID: number;
    firstName: string;
    lastName: string;
    position_abbreviation: string;
    year: string;
}