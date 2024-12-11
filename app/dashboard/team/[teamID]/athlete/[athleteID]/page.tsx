'use client'

import { useParams } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Athlete, CatapultData } from './catapult-data.model';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useContext } from 'react';
import { TeamContext } from '@/providers/team.provider';

export default function PerformanceTable() {
    const params = useParams();

    console.log('params:', params);

    if (!params.athleteID) {
        return null;
    }

    const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
    const [performanceData, setPerformanceData] = useState([]);
    const teamContext = useContext(TeamContext);

    useEffect(() => {
        axios.get(`/api/ws/athletes/${params.athleteID}`)
            .then(response => setSelectedAthlete(response.data))
            .catch(error => console.error('Error fetching athlete:', error));
    }, [params.athleteID]);

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
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/dashboard/team/${teamContext.selectedTeam?.teamID}`}>{teamContext.selectedTeam ? teamContext.selectedTeam.teamName : "Your team"}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{selectedAthlete?.first_name} {selectedAthlete?.last_name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl'>{selectedAthlete?.first_name} {selectedAthlete?.last_name}</h1>
            <DataTable columns={columns} data={data}></DataTable>
        </div>
    )
}