'use client'

import { TeamContext } from "@/providers/team.provider";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TeamDataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { Athlete, AthleteDataEntry } from "./catapult-data.model";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Team() {
    const params = useParams();
    const teamContext = useContext(TeamContext);

    const selectedTeam = teamContext.teams.find(team => team.teamID === parseInt(params.teamID));

    if (!selectedTeam) {
        return <div>Team not found.</div>
    }

    teamContext.selectTeam(selectedTeam);

    const [athletes, setAthletes] = useState<Athlete[]>([]);

    useEffect(() => {
        axios.get(`/api/ws/teams/${selectedTeam.teamID}/athletes`).then(response => {
            setAthletes(response.data);
        }).catch(error => { });
    }, [selectedTeam]);

    const data: AthleteDataEntry[] = athletes.map((athlete: Athlete) => ({
        athleteID: athlete.athleteID,
        firstName: athlete.first_name,
        lastName: athlete.last_name,
        position_abbreviation: athlete.position_abbreviation,
        year: athlete.year
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
                        <BreadcrumbPage>{teamContext.selectedTeam ? teamContext.selectedTeam.teamName : "Your team"}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{teamContext.selectedTeam?.teamName}</h1>

            <TeamDataTable columns={columns} data={data}></TeamDataTable>

            {/* <div>
                <p>2. Create Athlete Form (Opens in a sheet).</p>
                <div className="px-8">
                    <p>Fields: Athlete Name, Position, Year</p>
                </div>
            </div>
            <div>
                <p>3. Update Athlete Form (Opens in a sheet).</p>
                <div className="px-8">
                    <p>Fields: Athlete Name, Position, Year</p>
                    <p>Confirmation: Are you sure you want to update this athlete?</p>
                </div>
            </div>
            <div>
                <p>4. Delete Athlete (Opens a modal).</p>
                <div className="px-8">
                    <p>Confirmation: Are you sure you want to delete this athlete?</p>
                </div>
            </div>
            <div>
                <p>Import Athletes from .xlsx or .csv Files (SheetJS)</p>
            </div> */}
        </div>
    )
}