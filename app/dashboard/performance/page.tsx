'use client'

import * as XLSX from "xlsx";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Line} from 'react-chartjs-2';
import 'chart.js/auto'; 
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
    const [athletes, setAthletes] = useState<any[]>([]);
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

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-8 text-center">Performance Dashboard</h1>
            <div>
              <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger className="mb-4">
                    <button className="p-2 border">Select Athlete</button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {athletes.map(athlete => (
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
            
            {athleteData.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mt-8">{selectedAthlete && <p>Athlete: {selectedAthlete}</p>}</h2>
                    
                    <Line data={{
                        labels: athleteData.map(item => item.dataDate), 
                        datasets: [{
                            label: 'Maximum Velocity',
                            data: athleteData.map(item => item.maximumVelocity),
                            borderColor: 'rgba(255, 99, 132, 1)',
                            fill: false,
                        }],
                    }} />
                </div>
            )}
            
        </div>
    );
}

