'use client'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Bar, Line} from 'react-chartjs-2';
import 'chart.js/auto'; 
import
{DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel} from '@/components/ui/dropdown-menu'

export default function Performance() {
    const [athletes, setAthletes] = useState<any[]>([]);
    const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);
    const [athleteData, setAthleteData] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);

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

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-8 text-center">Performance Dashboard</h1>

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

