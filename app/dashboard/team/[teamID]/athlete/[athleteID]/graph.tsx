'use client'

import { Line } from "react-chartjs-2"
import { CatapultData } from "./catapult-data.model"
import 'chart.js/auto';
import { Button } from "@/components/ui/button";
import { Table } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { catapultLabels } from "./labels";

interface CatapultGraphProps {
    data: CatapultData[],
    setShowTable: (value: boolean) => void
}

export default function CatapultGraph({
    data,
    setShowTable
}: CatapultGraphProps) {
    const [selectedMetric, selectMetric] = useState<keyof CatapultData>();

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
                        <CardContent>
                            <label className="font-medium">Metric</label>
                            <Select onValueChange={(value: keyof CatapultData) => selectMetric(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a metric" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Metrics</SelectLabel>
                                        {
                                            Object.keys(catapultLabels).map((key) => {
                                                return (
                                                    <SelectItem key={key} value={key}>{catapultLabels[key]}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-1 overflow-auto">
                    <div className="rounded-xl border bg-card shadow p-4">
                        {
                        (!!selectedMetric) ? <Line
                            data={{
                                labels: data.map(item => item.dataDate),
                                datasets: [
                                    {
                                        label: catapultLabels[selectedMetric],
                                        data: data.map(item => item[selectedMetric]),
                                        borderColor: 'rgba(54, 162, 235, 1)',
                                        fill: false,
                                    },
                                ],
                            }}
                        /> :
                        <div className="flex items-center justify-center h-[400px]">Select a metric to display</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}