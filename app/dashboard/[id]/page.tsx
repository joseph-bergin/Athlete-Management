'use client'

import { useParams } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Athlete, CatapultData } from './catapult-data.model';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PerformanceTable() {
    const params = useParams();

    console.log('params:', params);

    if (!params.id) {
        return null;
    }

    const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
    const [performanceData, setPerformanceData] = useState([]);

    useEffect(() => {
        axios.get(`/api/ws/athletes/${params.id}`)
            .then(response => setSelectedAthlete(response.data))
            .catch(error => console.error('Error fetching athlete:', error));
    }, [params.id]);

    useEffect(() => {
        if (!!selectedAthlete) {
            axios.get(`/api/ws/catapult_data/athlete/${selectedAthlete.athleteID}`)
                .then(response => setPerformanceData(response.data))
                .catch(error => console.error('Error fetching performance data:', error));
        }
    }, [selectedAthlete]);

    const data = performanceData.map((entry: CatapultData) => ({
        ...entry,
        athleteName: `${selectedAthlete?.first_name} ${selectedAthlete?.last_name}`
    }));

    return (
        <div>
            <h1 className='font-bold'>{selectedAthlete?.first_name} {selectedAthlete?.last_name}</h1>
            <DataTable columns={columns} data={data}></DataTable>
        </div>
    )
}