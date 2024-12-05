'use client'

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AppUserContext } from "@/providers/app-user.provider";
import { TeamContext } from "@/providers/team.provider";
import { useContext } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const user = useContext(AppUserContext).appUser;
    const teams = useContext(TeamContext).teams;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Welcome {user?.firstName}!</h1>
            <h2 className="text-2xl font-bold mb-4">Your Teams</h2>
            {
                teams.map(team => (
                    <Link href={'/dashboard/team/' + team.teamID}>
                        <Card className="mb-4 hover:shadow-lg cursor-pointer transition-shadow duration-200">
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    <h3>{team.teamName}</h3>
                                    <ChevronRight />
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                ))
            }
        </div>
    );
}
