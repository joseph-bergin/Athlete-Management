'use client'

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { ForceFrameData, ForceFrameDataEntry } from './force-frame-data.model';
import { CatapultData } from '@/app/dashboard/performance/models';

export const catapultColumns: ColumnDef<CatapultData>[] = [
    {
        accessorKey: 'dataDate',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'totalPlayerLoad',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Player Load
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'explosiveYards',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Explosive Yards
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'playerLoadPerMin',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Player Load Per Min
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'totalHighIMA',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total High IMA
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'totalDistance',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Distance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'maximumVelocity',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Maximum Velocity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    }
]

// Average of L Avg Force (N)	Average of R Avg Force (N)	Average of Avg Imbalance
// leftAvgForce: number;
// rightAvgForce: number;
// avgImbalance: number;
export const forceFrameColumns: ColumnDef<ForceFrameDataEntry>[] = [
    {
        accessorKey: 'test',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Test Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'dataDate',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'leftAvgForce',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Left Average Force (N)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'rightAvgForce',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Right Average Force (N)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'avgImbalance',
        header: ({column}) => {
            return (
                <Button
                variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Average Imbalance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
]