'use client'

import { Line } from "react-chartjs-2"
import { CatapultData } from "./catapult-data.model"
import 'chart.js/auto';
import { Button } from "@/components/ui/button";
import { Table } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface CatapultGraphProps {
    data: CatapultData[],
    setShowTable: (value: boolean) => void
}

export default function CatapultGraph({
    data,
    setShowTable
}: CatapultGraphProps) {
    return (
        <div>
            <div className="flex items-center py-4">
                <Button variant="outline" size="icon" onClick={() => setShowTable(true)}>
                    <Table />
                </Button>
            </div>
            <div className="w-full max-w-full flex flex-row gap-4 h-fit">
                <div className="flex-shrink-0">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Graph Options</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
                <div className="flex-1 overflow-auto">
                    <div className="rounded-xl border bg-card shadow p-4">
                        <Line
                            data={{
                                labels: data.map(item => item.dataDate),
                                datasets: [
                                    {
                                        label: 'Total Player Load',
                                        data: data.map(item => item.totalPlayerLoad),
                                        borderColor: 'rgba(54, 162, 235, 1)',
                                        fill: false,
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}