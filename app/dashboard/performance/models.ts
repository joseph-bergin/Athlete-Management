export interface ParsedAthleteData {
    Name: string;
    "Date": Date;
    "Total Player Load": number;
    "Explosive Yardage (Total)": number;
    "Player Load Per Minute": number;
    "Total High IMA": number;
    "Total Distance (y)": number;
    "Maximum Velocity (mph)": number;
  }
  
  export type ParsedAthleteDataDTO = ParsedAthleteData & { teamID: number | undefined };
  
  export interface ParsedForceFrameAthleteData {
    Name: string;
    "Date": Date;
    "Time": string;
    "Device": string;
    "Mode": string;
    "Test": string;
    "Direction": string;
    "Angle": string;
    "Left Reps": number;
    "Right Reps": number;
    "Left Max Force": number;
    "Right Max Force": number;
    "Max Imbalance": number;
    "Left Max Ratio": number;
    "Right Max Ratio": number;
    "Left Avg Force": number;
    "Right Avg Force": number;
    "Avg Imbalance": number;
    "Left Avg Ratio": number;
    "Right Avg Ratio": number;
    "Left Max Impulse": number;
    "Right Max Impulse": number;
    "Impulse Imbalance": number;
  }
  
  export type ParsedForceFrameAthleteDataDTO = ParsedForceFrameAthleteData & { teamID: number | undefined };
  
  export interface Athlete {
    athleteID: number;
    teamID: number;
    first_name: string;
    last_name: string;
    year: string;
    position: string;
  }
  
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
  
  export interface ForceFrameData {
    athleteID: number;
    dataDate: Date;
    dataTime: string;
    deviceName: string;
    mode: string;
    test: string;
    direction: string;
    angle: string;
    leftReps: number;
    rightReps: number;
    leftMaxForce: number;
    rightMaxForce: number;
    maxImbalance: number;
    leftMaxRatio: number;
    rightMaxRatio: number;
    leftAvgForce: number;
    rightAvgForce: number;
    avgImbalance: number;
    leftAvgRatio: number;
    rightAvgRatio: number;
    leftMaxImpulse: number;
    rightMaxImpulse: number;
    impulseImbalance: number;
  }