
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

export interface ForceFrameDataEntry {
    dataDate: Date;
    test: string;
    leftAvgForce: number;
    rightAvgForce: number;
    avgImbalance: number;
}