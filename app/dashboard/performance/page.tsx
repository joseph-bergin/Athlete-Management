'use client'
import React, { useState } from 'react';
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
    
    const [athleteData] = useState([
        { player_load: 1, explosive_yards: 30, total_distance: 500, max_velocity: 9.5 },
        { player_load: 2, explosive_yards: 35, total_distance: 550, max_velocity: 9.8 },
        { player_load: 3, explosive_yards: 40, total_distance: 600, max_velocity: 10.1 },
        { player_load: 4, explosive_yards: 28, total_distance: 520, max_velocity: 9.6 },
        { player_load: 5, explosive_yards: 38, total_distance: 570, max_velocity: 9.9 },
    ]);

    
    const barData = {
        labels: athleteData.map((item) => `Player ${item.player_load}`),
        datasets: [
            {
                label: 'Explosive Yards',
                data: athleteData.map((item) => item.explosive_yards),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Total Distance',
                data: athleteData.map((item) => item.total_distance),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const lineData = {
        labels: athleteData.map((item) => `Player ${item.player_load}`),
        datasets: [
            {
                label: 'Max Velocity',
                data: athleteData.map((item) => item.max_velocity),
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
