import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import ForceFrameUpload from "./forceframe-upload";
import CatapultUpload from "./catapult-upload";
import { useContext, useState } from "react";
import { TeamContext } from "@/providers/team.provider";
import { cn } from "@/lib/utils";

export interface ParsedCatapultData {
    Name: string;
    "Date": Date;
    "Total Player Load": number;
    "Explosive Yardage (Total)": number;
    "Player Load Per Minute": number;
    "Total High IMA": number;
    "Total Distance (y)": number;
    "Maximum Velocity (mph)": number;
}

export type ParsedCatapultDataDTO = ParsedCatapultData & { teamID: number | undefined };

export interface ParsedForceFrameData {
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

export type ParsedForceFrameDataDTO = ParsedForceFrameData & { teamID: number | undefined };

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

export const LoadingSpinner = ({ className }: { className: string }) => {
    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>);
}

export default function UploadSheet() {
    const [catapultData, setCatapultData] = useState<ParsedCatapultData[]>([]);
    const [forceFrameData, setForceFrameData] = useState<ParsedForceFrameData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Button variant="outline" size="sm" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Data
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Upload Data</SheetTitle>
                        <SheetDescription>
                            Upload data from a .csv file.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="my-4">
                        {loading ?
                        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                            <LoadingSpinner className="text-primary-500" />
                        </div> :
                        <div className="flex flex-col gap-4">
                            <CatapultUpload
                                selectedTeam={selectedTeam}
                                setLoading={setLoading}
                            />
                            <ForceFrameUpload
                                selectedTeam={selectedTeam}
                                setLoading={setLoading}
                            />
                        </ div>}
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}