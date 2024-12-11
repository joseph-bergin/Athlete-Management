'use client'

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AppUserContext } from "@/providers/app-user.provider";
import { TeamContext } from "@/providers/team.provider";
import { useContext } from "react";
import { ChevronRight, CirclePlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface Team {
    teamID: number;
    teamOwnerID: number;
    teamName: string;
}

export default function Dashboard() {
    const user = useContext(AppUserContext).appUser;
    const [teamName, setTeamName] = useState('');
    const appUserContext = useContext(AppUserContext);
    const teamContext = useContext(TeamContext);

    const handleCreateTeam = async () => {
        if (!teamName.trim()) {
            toast({
                title: 'Error',
                description: 'Team name cannot be empty!',
            });
            return;
        }

        const newTeamData = {
            teamName,
            teamOwnerID: appUserContext.appUser?.userID,
        };

        try {
            const response = await fetch('/api/ws/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTeamData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${errorText}`);
            }

            const createdTeam = await response.json();
            toast({
                title: 'Success',
                description: `Team "${createdTeam.teamName}" created successfully!`,
            });

            await teamContext.getTeams();
            teamContext.selectTeam(createdTeam);

            setTeamName(''); // Clear input field
        } catch (error) {
            console.error('Create Team Error:', error);
            toast({
                title: 'Error',
                description: 'Failed to create team',
            });
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Welcome {user?.firstName}!</h1>

            <Separator />

            <div className="flex justify-between items-center my-4">
                <h2 className="text-2xl font-bold">Your Teams</h2>
                <Dialog>
                    <DialogTrigger>
                        <Button variant={"outline"}>
                            <CirclePlus className="inline mr-2" /> Create Team
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create a New Team</DialogTitle>
                            <DialogDescription>
                                Please provide a name for your new team.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <Input
                                id="teamName"
                                placeholder="Team Name"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button>Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button onClick={handleCreateTeam}>Create</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {
                teamContext.teams.map(team => (
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
