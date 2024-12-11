'use client'

import { useParams } from 'next/navigation';
import { catapultColumns, forceFrameColumns } from './columns';
import { DataTable } from './data-table';
import { Athlete, CatapultData } from './catapult-data.model';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useContext } from 'react';
import { TeamContext } from '@/providers/team.provider';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ForceFrameData, ForceFrameDataEntry } from './force-frame-data.model';
import CatapultGraph from './graph';

export default function PerformanceTable() {
    const params = useParams();

    console.log('params:', params);

    if (!params.athleteID) {
        return null;
    }

    const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
    const [catapultData, setCatapultData] = useState<CatapultData[]>([]);
    const [forceFrameData, setForceFrameData] = useState<ForceFrameData[]>([]);
    const teamContext = useContext(TeamContext);
    const [showCatapultTable, setShowCatapultTable] = useState(true);
    const [showForceFrameTable, setShowForceFrameTable] = useState(true);

    useEffect(() => {
        axios.get(`/api/ws/athletes/${params.athleteID}`)
            .then(response => setSelectedAthlete(response.data))
            .catch(error => console.error('Error fetching athlete:', error));
    }, [params.athleteID]);

    useEffect(() => {
        if (!!selectedAthlete) {
            axios.get(`/api/ws/catapult_data/athlete/${selectedAthlete.athleteID}`)
                .then(response => setCatapultData(response.data))
                .catch(error => console.error('Error fetching performance data:', error));

            axios.get(`/api/ws/force_frame_data/athlete/${selectedAthlete.athleteID}`)
                .then(response => setForceFrameData(response.data))
                .catch(error => console.error('Error fetching performance data:', error));
        }
    }, [selectedAthlete]);

    const formatedCatapultData = catapultData.map((entry: CatapultData) => ({
        ...entry,
        athleteName: `${selectedAthlete?.first_name} ${selectedAthlete?.last_name}`
    }));

    const formatedForceFrameData: ForceFrameDataEntry[] = forceFrameData.map((entry: ForceFrameData) => ({
        ...entry,
    }));

    return (
        <div className="mb-4">
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

            <Separator className="my-2" />

            <Tabs defaultValue="catapult" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="catapult">Catapult</TabsTrigger>
                    <TabsTrigger value="forceframe">ForceFrame</TabsTrigger>
                </TabsList>
                <TabsContent value="catapult">
                    {
                        showCatapultTable ?
                        <DataTable setShowTable={setShowCatapultTable} columns={catapultColumns} data={catapultData}></DataTable> : 
                        <CatapultGraph data={catapultData} setShowTable={setShowCatapultTable} />
                    }
                </TabsContent> 
                <TabsContent value="forceframe">
                    <DataTable setShowTable={setShowForceFrameTable} columns={forceFrameColumns} data={formatedForceFrameData}></DataTable>
                </TabsContent>
            </Tabs>
        </div>
    )
}