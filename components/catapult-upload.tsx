'use client';

import React, { ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Team } from '@/providers/team.provider';
import { ParsedCatapultData, ParsedCatapultDataDTO } from './upload-sheet';

type CatapultCsvUploadProps = {
  selectedTeam: Team | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CatapultUpload: React.FC<CatapultCsvUploadProps> = ({ selectedTeam, setLoading }) => {
  const { toast } = useToast();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error('No file selected');
      return;
    }

    if (!selectedTeam) {
      console.error('No team selected');
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      if (!evt.target || typeof evt.target.result !== 'string') {
        console.error('File read error');
        return;
      }

      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary', cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data: ParsedCatapultData[] = XLSX.utils.sheet_to_json(sheet, { dateNF: 'd"/"m"/"yyyy' });
      const dto: ParsedCatapultDataDTO[] = data.map((entry) => ({ ...entry, teamID: selectedTeam?.teamID }));

      uploadCsvData(dto);
    };

    reader.readAsBinaryString(file);
  };

  const uploadCsvData = async (data: ParsedCatapultDataDTO[]) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/ws/upload_csv', data);
      setLoading(false);

      if (response.status === 201) {
        console.log('Data uploaded successfully!');
        toast({ title: 'Data uploaded successfully!', description: 'Performance data has been uploaded successfully.' });
      } else {
        console.error('Failed to upload data.');
        toast({ title: 'Failed to upload data.', description: 'An error occurred while uploading the performance data.', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Failed to upload data.', description: 'An error occurred while uploading the performance data.', variant: 'destructive' });
    }
  };

  return (
    <div>
      <Button variant="outline" className="w-full" onClick={() => document.getElementById('file-upload')?.click()}>
        <Upload className="mr-2 h-4 w-4" />
        Upload Catapult CSV
      </Button>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default CatapultUpload;
