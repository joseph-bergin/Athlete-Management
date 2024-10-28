'use client'

import * as XLSX from "xlsx";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Line} from 'react-chartjs-2';
import 'chart.js/auto'; 
import { Button } from "@/components/ui/button"
import { Upload, ChevronDown } from 'lucide-react'
import
{DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel} from '@/components/ui/dropdown-menu'

export interface AthleteData {
  Name: string;
  //Date: Date; // Could also be a `Date` type depending on your handling
  "Total Player Load": number;
  "Explosive Yardage (Total)": number;
  "Player Load Per Minute": number;
  "Total High IMA": number;
  "Total Distance (y)": number;
  "Maximum Velocity (mph)": number;
}

export default function Performance() {
    const [positions, setPositions] = useState<any[]>([]);
    const [athletes, setAthletes] = useState<any[]>([]);
    const [filterdAthletes, setFilteredAthletes] = useState<any[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
    const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);
    const [athleteData, setAthleteData] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [csvData, setCsvData] = useState<AthleteData[]>([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            axios.get('http://127.0.0.1:5000/api/ws/athletes')
                .then(response => setAthletes(response.data))
                .catch(error => console.error('Error fetching athletes:', error));
            
            axios.get('http://127.0.0.1:5000/api/ws/positions')
                .then(response => setPositions(response.data))
                .catch(error => console.error('Error fetching positions:', error));
        }
    }, [isMounted]);

    const handleAthleteSelection = (athleteID: number, first_name: string, last_name: string) => {
        setSelectedAthlete(`${first_name} ${last_name}`);
        
        axios.get(`http://127.0.0.1:5000/api/ws/catapult_data/athlete/${athleteID}`)
            .then(response => { 
                setAthleteData(response.data); 
            })
            .catch(error => console.error('Error fetching performance data:', error));
    };

    const handlePositionSelection = (position_abbreviation: string) => {
      setSelectedPosition(`${position_abbreviation}`);

      const filteredAthletes = athletes.filter(athlete => athlete.position_abbreviation === position_abbreviation);
      setFilteredAthletes(filteredAthletes);
  };

    if (!isMounted) {
        return null; 
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        console.error("No file selected");
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
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
  
        const data: AthleteData[] = XLSX.utils.sheet_to_json<AthleteData>(sheet);
  
        // Here you might want to check the structure of `data`
        console.log("Parsed Data: ", data);
        
        setCsvData(data);
        uploadCsvData(data);
      };
  
      reader.readAsBinaryString(file);
    };
  
    const uploadCsvData = async (data: AthleteData[]) => {
      try {
        console.log("page test");
        const response = await axios.post("http://localhost:5000/api/ws/upload_csv", 
          data
        );
  
        if (response.status == 201) {
          console.log("Data uploaded successfully!");
        } else {
          console.error("Failed to upload data.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const sortedAthleteData = [...athleteData].sort((a, b) => new Date(a.dataDate).getTime() - new Date(b.dataDate).getTime());

    return (
      <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Performance Dashboard</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <div className="w-full sm:w-auto">
          <Button variant="outline" className="w-full" onClick={() => document.getElementById('file-upload')?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV
          </Button>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              {selectedPosition || 'Select Position'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Positions</DropdownMenuLabel>
            {positions.map(position => (
              <DropdownMenuItem 
                key={position.abbreviation} 
                onClick={() => handlePositionSelection(position.abbreviation)}
              >
                {position.abbreviation 
                  ? `${position.abbreviation}` 
                  : `Position ${position.positionName}`}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto" disabled={!selectedPosition}>
              {selectedAthlete || 'Select Athlete'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Athletes</DropdownMenuLabel>
            {filterdAthletes.map(athlete => (
              <DropdownMenuItem 
                key={athlete.athleteID} 
                onClick={() => handleAthleteSelection(athlete.athleteID, athlete.first_name, athlete.last_name)}
              >
                {athlete.first_name && athlete.last_name 
                  ? `${athlete.first_name} ${athlete.last_name}` 
                  : `Athlete ${athlete.athleteID}`}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {sortedAthleteData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="col-span-2">
                  <h2 className="text-xl font-bold mb-4">{selectedAthlete && <p>Athlete: {selectedAthlete}</p>}</h2>
              </div>

              {/* Total Player Load Graph */}
              <div>
                  <h3>Total Player Load</h3>
                  <Line
                      data={{
                          labels: sortedAthleteData.map(item => item.dataDate),
                          datasets: [
                              {
                                  label: 'Total Player Load',
                                  data: sortedAthleteData.map(item => item.totalPlayerLoad),
                                  borderColor: 'rgba(54, 162, 235, 1)',
                                  fill: false,
                              },
                          ],
                      }}
                  />
              </div>

              {/* Player Load Per Minute Graph */}
              <div>
                  <h3>Player Load Per Minute</h3>
                  <Line
                      data={{
                          labels: sortedAthleteData.map(item => item.dataDate),
                          datasets: [
                              {
                                  label: 'Player Load Per Minute',
                                  data: sortedAthleteData.map(item => item.playerLoadPerMin),
                                  borderColor: 'rgba(255, 206, 86, 1)',
                                  fill: false,
                              },
                          ],
                      }}
                  />
              </div>

              {/* Maximum Velocity Graph */}
              <div>
                  <h3>Maximum Velocity</h3>
                  <Line
                      data={{
                          labels: sortedAthleteData.map(item => item.dataDate),
                          datasets: [
                              {
                                  label: 'Maximum Velocity',
                                  data: sortedAthleteData.map(item => item.maximumVelocity),
                                  borderColor: 'rgba(255, 99, 132, 1)',
                                  fill: false,
                              },
                          ],
                      }}
                  />
              </div>

              {/* Explosive Yardage Graph */}
              <div>
                  <h3>Explosive Yardage</h3>
                  <Line
                      data={{
                          labels: sortedAthleteData.map(item => item.dataDate),
                          datasets: [
                              {
                                  label: 'Explosive Yardage',
                                  data: sortedAthleteData.map(item => item.explosiveYards),
                                  borderColor: 'rgba(75, 192, 192, 1)',
                                  fill: false,
                              },
                          ],
                      }}
                  />
              </div>

              {/* Total Distance Graph */}
              <div>
                  <h3>Total Distance</h3>
                  <Line
                      data={{
                          labels: sortedAthleteData.map(item => item.dataDate),
                          datasets: [
                              {
                                  label: 'Total Distance',
                                  data: sortedAthleteData.map(item => item.totalDistance),
                                  borderColor: 'rgba(255, 159, 64, 1)',
                                  fill: false,
                              },
                          ],
                      }}
                  />
              </div>

              {/* Total High IMA Graph */}
              <div>
                  <h3>Total High IMA</h3>
                  <Line
                      data={{
                          labels: sortedAthleteData.map(item => item.dataDate),
                          datasets: [
                              {
                                  label: 'Total High IMA',
                                  data: sortedAthleteData.map(item => item.totalHighIMA),
                                  borderColor: 'rgba(255, 206, 86, 1)',
                                  fill: false,
                              },
                          ],
                      }}
                  />
              </div>
          </div>
      )}
  </div>
    );
}

