import { CatapultData } from "./catapult-data.model";

export const catapultLabels: Record<keyof Exclude<CatapultData, {athleteID: number}>, string> = {
    totalPlayerLoad: 'Total Player Load',
    explosiveYards: 'Explosive Yards',
    playerLoadPerMin: 'Player Load Per Min',
    totalHighIMA: 'Total High IMA',
    totalDistance: 'Total Distance',
    maximumVelocity: 'Maximum Velocity',
}
