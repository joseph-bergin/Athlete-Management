'use client'

import * as XLSX from "xlsx";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Button } from "@/components/ui/button"
import { Upload, ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { TeamContext } from "@/providers/team.provider";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Athlete, CatapultData, ForceFrameData, ParsedAthleteData, ParsedAthleteDataDTO, ParsedForceFrameAthleteData, ParsedForceFrameAthleteDataDTO } from "./models";
import CatapultUpload from "./catapult-upload";
import ForceFrameUpload from "./forceframe-upload";

export default function Performance() {
  const [athletes, setAthletes] = useState<any[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [performanceData, setPerformanceData] = useState<CatapultData[]>([]);
  const [csvData, setCsvData] = useState<ParsedAthleteData[]>([]);
  const { selectedTeam } = useContext(TeamContext);
  const { toast } = useToast();

  const [forceFrameData, setForcePerformanceData] = useState<ForceFrameData[]>([]);
  const [forceFrameCsvData, setForceCsvData] = useState<ParsedForceFrameAthleteData[]>([]);

  useEffect(() => {
    if (!!selectedTeam) {
      axios.get(`/api/ws/teams/${selectedTeam.teamID}/athletes`)
        .then(response => setAthletes(response.data))
        .catch(error => setAthletes([]));
    }
  }, [selectedTeam, csvData]);

  useEffect(() => {
    console.log('csv data changed');
    if (!!selectedAthlete) {
      axios.get(`/api/ws/catapult_data/athlete/${selectedAthlete.athleteID}`)
        .then(response => setPerformanceData(response.data))
        .catch(error => console.error('Error fetching performance data:', error));
    }
  }, [selectedAthlete, csvData]);

  const handleForceFrameFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected");
      return;
    }

    if(!selectedTeam) {
      console.error("No team selected");
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      if (!evt.target || typeof evt.target.result !== 'string') {
        console.error("File read error");
        return;
      }

      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary", cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data: ParsedForceFrameAthleteData[] = XLSX.utils.sheet_to_json<ParsedForceFrameAthleteData>(sheet, { dateNF: 'd"/"m"/"yyyy' });
      const dto: ParsedForceFrameAthleteDataDTO[] = data.map(entry => ({ ...entry, teamID: selectedTeam ? selectedTeam.teamID : undefined }));

      uploadForceFrameCsvData(dto);
    };

    reader.readAsBinaryString(file);
  };

  const uploadForceFrameCsvData = async (data: ParsedForceFrameAthleteDataDTO[]) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/ws/upload_force_frame_csv",
        data
      );
      setLoading(false);

      if (response.status == 201) {
        console.log("Data uploaded successfully!");
        setForceCsvData(data);
        toast({title: "Data uploaded successfully!", description: "Performance Force Frame data has been uploaded successfully."});
      } else {
        console.error("Failed to upload data.");
        toast({title: "Failed to upload data.", description: "An error occurred while uploading the performance data.", variant: "destructive"});
      }
    } catch (error) {
      console.error("Error:", error);
      toast({title: "Failed to upload data.", description: "An error occurred while uploading the performance data.", variant: "destructive"});
    }
  };

  const sortedForceFramePerformanceData = forceFrameData.sort((a, b) => new Date(a.dataDate).getTime() - new Date(b.dataDate).getTime());
  const sortedPerformanceData = performanceData.sort((a, b) => new Date(a.dataDate).getTime() - new Date(b.dataDate).getTime());

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Performance Dashboard</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <div className="w-full sm:w-auto">
          <CatapultUpload
            selectedTeam={selectedTeam}
            setCsvData={setCsvData}
            setLoading={setLoading}
          />
        </div>
        <div className="w-full sm:w-auto">
          <ForceFrameUpload 
            selectedTeam={selectedTeam}
            setForceCsvData={setForceCsvData}
            setLoading={setLoading}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              {selectedAthlete ? `${selectedAthlete.first_name} ${selectedAthlete.last_name}` : 'Select Athlete'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Athletes</DropdownMenuLabel>
            {athletes.map(athlete => (
              <DropdownMenuItem
                key={athlete.athleteID}
                onClick={() => setSelectedAthlete(athlete)}
              >
                {athlete.first_name && athlete.last_name
                  ? `${athlete.first_name} ${athlete.last_name}`
                  : `Athlete ${athlete.athleteID}`}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-4">{selectedAthlete && <p>Athlete: {selectedAthlete.first_name} {selectedAthlete.last_name}</p>}</h2>
        </div>

        {/* Total Player Load Graph */}
        <div className="p-4 h-72 box-border">

          {loading ?
            <>
              <Skeleton className="w-6/12 my-2 h-6" />
              <Skeleton className="w-full h-full" />
            </> :
            <>
              <h3 className="my-2">Total Player Load</h3>
              <Line
                className="h-full"
                data={{
                  labels: sortedPerformanceData.map(item => item.dataDate),
                  datasets: [
                    {
                      label: 'Total Player Load',
                      data: sortedPerformanceData.map(item => item.totalPlayerLoad),
                      borderColor: 'rgba(54, 162, 235, 1)',
                      fill: false,
                    },
                  ],
                }}
              />
            </>
          }
        </div>

        {/* Player Load Per Minute Graph */}
        <div className="p-4 h-72 box-border">

          {loading ?
            <>
              <Skeleton className="w-6/12 my-2 h-6" />
              <Skeleton className="w-full h-full" />
            </> :
            <>
              <h3 className="my-2">Player Load Per Minute</h3>
              <Line
                className="h-full"
                data={{
                  labels: sortedPerformanceData.map(item => item.dataDate),
                  datasets: [
                    {
                      label: 'Player Load Per Minute',
                      data: sortedPerformanceData.map(item => item.playerLoadPerMin),
                      borderColor: 'rgba(255, 206, 86, 1)',
                      fill: false,
                    },
                  ],
                }}
              />
            </>
          }
        </div>

        {/* Maximum Velocity Graph */}
        <div className="p-4 h-72 box-border">

          {loading ?
            <>
              <Skeleton className="w-6/12 my-2 h-6" />
              <Skeleton className="w-full h-full" />
            </> :
            <>
              <h3 className="my-2">Maximum Velocity</h3>
              <Line
                className="h-full"
                data={{
                  labels: sortedPerformanceData.map(item => item.dataDate),
                  datasets: [
                    {
                      label: 'Maximum Velocity',
                      data: sortedPerformanceData.map(item => item.maximumVelocity),
                      borderColor: 'rgba(255, 99, 132, 1)',
                      fill: false,
                    },
                  ],
                }}
              />
            </>
          }
        </div>

        {/* Explosive Yardage Graph */}
        <div className="p-4 h-72 box-border">

          {loading ?
            <>
              <Skeleton className="w-6/12 my-2 h-6" />
              <Skeleton className="w-full h-full" />
            </> :
            <>
              <h3 className="my-2">Explosive Yardage</h3>
              <Line
                className="h-full"
                data={{
                  labels: sortedPerformanceData.map(item => item.dataDate),
                  datasets: [
                    {
                      label: 'Explosive Yardage',
                      data: sortedPerformanceData.map(item => item.explosiveYards),
                      borderColor: 'rgba(75, 192, 192, 1)',
                      fill: false,
                    },
                  ],
                }}
              />
            </>
          }
        </div>

        {/* Total Distance Graph */}
        <div className="p-4 h-72 box-border">

          {loading ?
            <>
              <Skeleton className="w-6/12 my-2 h-6" />
              <Skeleton className="w-full h-full" />
            </> :
            <>
              <h3 className="my-2">Total Distance</h3>
              <Line
                className="h-full"
                data={{
                  labels: sortedPerformanceData.map(item => item.dataDate),
                  datasets: [
                    {
                      label: 'Total Distance',
                      data: sortedPerformanceData.map(item => item.totalDistance),
                      borderColor: 'rgba(255, 159, 64, 1)',
                      fill: false,
                    },
                  ],
                }}
              />
            </>
          }
        </div>

        {/* Total High IMA Graph */}
        <div className="p-4 h-72 box-border">

          {loading ?
            <>
              <Skeleton className="w-6/12 my-2 h-6" />
              <Skeleton className="w-full h-full" />
            </> :
            <>
              <h3 className="my-2">Total High IMA</h3>
              <Line
                className="h-full"
                data={{
                  labels: sortedPerformanceData.map(item => item.dataDate),
                  datasets: [
                    {
                      label: 'Total High IMA',
                      data: sortedPerformanceData.map(item => item.totalHighIMA),
                      borderColor: 'rgba(255, 206, 86, 1)',
                      fill: false,
                    },
                  ],
                }}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

