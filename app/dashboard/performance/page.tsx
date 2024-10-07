'use client'

import { useState } from 'react'
import * as XLSX from "xlsx";
import axios from 'axios';
import { Button } from "@/components/ui/button"

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

function Performance() {
  const [csvData, setCsvData] = useState<AthleteData[]>([]);

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

      if (response.status == 200) {
        console.log("Data uploaded successfully!");
      } else {
        console.error("Failed to upload data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <p>Performance Page</p>
        <iframe width="600" height="450" src="https://lookerstudio.google.com/embed/reporting/9dbdbb4c-e522-4598-a40c-b81fb3d21983/page/M1rCE" allowFullScreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
      </div>
      <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
    </div>
  );
}

export default Performance;
