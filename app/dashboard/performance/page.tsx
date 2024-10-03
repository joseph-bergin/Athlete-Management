'use client'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'; 
import
{
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel
} from '@/components/ui/dropdown-menu'

export default function Performance() {
    const [selectedChart, setSelectedChart] = useState('bar');
    
    const [athleteData, setAthleteData] = useState<any>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/ws/catapult_data/3')
            .then(response => {
                console.log(response.data);
                setAthleteData(response.data);
            })
            .catch(error => {
                console.error("Error fetching athlete data: ", error);
            });
    }, []);

    
    const barData = {
        labels: ['Explosive Yards', 'Total Distance', 'Player Load'],
        datasets: [
            {
                label: `Athlete ${athleteData.athleteID}`,
                data: [
                    athleteData.explosiveYards,
                    athleteData.totalDistance,
                    athleteData.totalPlayerLoad
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            }
        ],
    };

    const lineData = {
        labels: ['Max Velocity'],  
        datasets: [
            {
                label: `Athlete ${athleteData.athleteID} - Max Velocity`,
                data: [athleteData.maximumVelocity], 
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-8 text-center">Athlete Performance Charts</h1>
            <DropdownMenu>
                <DropdownMenuTrigger className="mb-4">
                    Select Chart
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        Select a chart:
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setSelectedChart('bar')}>
                        Bar Chart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedChart('line')}>
                        Line Chart
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="mb-8">
                {selectedChart === 'bar' && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Explosive Yards vs Total Distance (Bar Chart)</h2>
                        <Bar data={barData} />
                    </>
                )}
                {selectedChart === 'line' &&(
                    <>
                    <h2 className="text-xl font-semibold mb-4">Max Velocity (Line Chart)</h2>
                    <Line data={lineData} />
                    </>
                )}
            </div>
        </div>
    );
}
