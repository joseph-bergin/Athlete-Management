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
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ModeToggle } from "./theme-mode-toggle";

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


export function NavHeader() {
    const { user, error, isLoading } = useUser();

    return (
        <>
            <div className="grid grid-cols-2 grid-rows-1 py-4 justify-items-center items-center z-50">
                <NavigationTitle></NavigationTitle>
                <div className="flex items-center gap-2">
                    {user ? <Menu></Menu> : <LoginButton></LoginButton>}
                    <ModeToggle></ModeToggle>
                </div>
            </div>
        </>
    )
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