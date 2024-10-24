'use client'

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "./ui/navigation-menu";
import React, { useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ModeToggle } from "./theme-mode-toggle";
import { Skeleton } from "@/components/ui/skeleton"
import { TeamContext } from "@/providers/team.provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, CirclePlus, Users } from "lucide-react";

export interface Team {
    teamID: number;
    teamOwnerID: number;
    teamName: string;
}

const NavigationTitle = () => (
    <div>
        <p className="font-bold">Athlete Management System</p>
    </div>
)

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
    selectTeam: (Team: Team) => void;
};

const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, selectedTeam, selectTeam }) => (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant={"outline"}>{!!selectedTeam ? selectedTeam.teamName : 'Select Team'} <ChevronDown className="inline ml-2" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Your Teams</DropdownMenuLabel>
            {teams.map((team) => (
                    <DropdownMenuItem className="hover:cursor-pointer" onClick={() => selectTeam(team)}>{team.teamName}</DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer"><CirclePlus className="inline mr-2" /> Create Team</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

export function NavHeader() {
    const { user, error, isLoading } = useUser();
    const teamContext = useContext(TeamContext);

    if(isLoading) {
        return (
            <div className="grid grid-cols-3 grid-rows-1 py-4 justify-items-center items-center z-50">
                <NavigationTitle></NavigationTitle>

                <Skeleton className="col-span-2 h-8 w-8/12"></Skeleton>
            </div>
        )
    }

    if(user) {
        return (
            <>
                <div className="grid grid-cols-3 grid-rows-1 py-4 justify-items-center items-center z-50">
                    <NavigationTitle></NavigationTitle>
    
                    <TeamSelector teams={teamContext.teams} selectedTeam={teamContext.selectedTeam} selectTeam={teamContext.selectTeam}></TeamSelector>
    
                    <div className="flex items-center gap-2">
                        <Menu></Menu>
                        <ModeToggle></ModeToggle>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="grid grid-cols-3 grid-rows-1 py-4 justify-items-center items-center z-50">
                    <NavigationTitle></NavigationTitle>
                    <div></div>
                    <div className="flex items-center gap-2">
                        <LoginButton></LoginButton>
                        <ModeToggle></ModeToggle>
                    </div>
                </div>
            </>
        )
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