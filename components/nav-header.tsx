'use client';

import React, { useContext, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { TeamContext } from '@/providers/team.provider';
import { AppUserContext } from '@/providers/app-user.provider';
import { ChevronDown, CirclePlus } from 'lucide-react';
import { ModeToggle } from './theme-mode-toggle';
import { useUser } from '@auth0/nextjs-auth0/client';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { cn } from '@/lib/utils';

export interface Team {
    teamID: number;
    teamOwnerID: number;
    teamName: string;
}

const NavigationTitle = () => (
    <div>
        <p className="font-bold">Athlete Management System</p>
    </div>
);

const LoginButton = () => (
    <Button asChild size={'sm'}>
        <a href="/api/auth/login">Login</a>
    </Button>
)

const Menu = () => (
    <div>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Team Tools</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[300px]">
                            <ListItem title="Team Manager" children="View and manage your team." href="/dashboard/team"></ListItem>
                            <ListItem title="Performance Analytics" children="Tools to help track athlete performance." href="/dashboard/performance"></ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <a href="/profile">Profile</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <a href="/api/auth/logout">Logout</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
)

interface TeamSelectorProps {
    teams: Team[];
    selectedTeam: Team | undefined;
    selectTeam: (team: Team) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, selectedTeam, selectTeam }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
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
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline">
                            {selectedTeam ? selectedTeam.teamName : 'Select Team'}{' '}
                            <ChevronDown className="inline ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Your Teams</DropdownMenuLabel>
                        {teams.map((team) => (
                            <DropdownMenuItem
                                key={team.teamID}
                                className="hover:cursor-pointer"
                                onClick={() => selectTeam(team)}
                            >
                                {team.teamName}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DialogTrigger>
                            <DropdownMenuItem
                                className="hover:cursor-pointer"
                            >
                                <CirclePlus className="inline mr-2" /> Create Team
                            </DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

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
    );
};

export function NavHeader() {
    const teamContext = useContext(TeamContext);
    const { user, isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="grid grid-cols-3 grid-rows-1 py-4 justify-items-center items-center z-50">
                <NavigationTitle />
                <Skeleton className="col-span-2 h-8 w-8/12" />
            </div>
        );
    }

    if (user) {
        return (
            <div className="grid grid-cols-3 grid-rows-1 py-4 justify-items-center items-center z-50">
                <NavigationTitle />

                <TeamSelector
                    teams={teamContext.teams}
                    selectedTeam={teamContext.selectedTeam}
                    selectTeam={teamContext.selectTeam}
                />

                <div className="flex items-center gap-2">
                    <Menu />
                    <ModeToggle />
                </div>
            </div>
        );
    } else {
        return (
            <div className="grid grid-cols-3 grid-rows-1 py-4 justify-items-center items-center z-50">
                <NavigationTitle />
                <div />
                <div className="flex items-center gap-2">
                    <LoginButton />
                    <ModeToggle />
                </div>
            </div>
        );
    }
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"