'use client';

import { cn } from "@/lib/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-mode-toggle";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Skeleton } from "./ui/skeleton";
import UploadSheet from "./upload-sheet";

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
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <a href="/dashboard">Dashboard</a>
                    </NavigationMenuLink>
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
);

export function NavHeader() {
    const { user, error, isLoading } = useUser();
    
    if(isLoading) {
        return (
            <div className="grid grid-cols-3 grid-rows-1 py-4 justify-items-center items-center z-50">
                <NavigationTitle />
                <Skeleton className="col-span-2 h-8 w-8/12" />
            </div>
        );
    }

    if (user) {
        return (
            <>
                <div className="grid grid-cols-2 grid-rows-1 py-4 justify-items-center items-center z-50">
                    <NavigationTitle></NavigationTitle>
    
                    {/* <TeamSelector teams={teamContext.teams} selectedTeam={teamContext.selectedTeam} selectTeam={teamContext.selectTeam}></TeamSelector> */}
    
                    <div className="flex items-center gap-2">
                        <Menu></Menu>
                        <UploadSheet />
                        <ModeToggle></ModeToggle>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="grid grid-cols-2 grid-rows-1 py-4 justify-items-center items-center z-50">
                    <NavigationTitle></NavigationTitle>
                    <div className="flex items-center gap-2">
                        <LoginButton></LoginButton>
                        <ModeToggle></ModeToggle>
                    </div>
                </div>
            </>
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