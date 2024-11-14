'use client'

import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { ReactNode, useState, useEffect, createContext } from "react";

export interface User {
    userID: number;
    firstName: string;
    lastName: string;
    authID: string;
}

export interface AppUserContext {
    appUser: User | undefined;
}

export const AppUserContext = createContext({
    appUser: undefined
} as AppUserContext);

export function AppUserProvider({ children }: { children: ReactNode }) {
    const { user, error, isLoading } = useUser();
    const [appUser, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        if(user) {
            axios.get(`/api/ws/users/${user.sub}`).then(response => {
                setUser(response.data);
            }).catch(() => {setUser(undefined)});
        }
    }, [user]);

    return (
      <AppUserContext.Provider value={{
        appUser
      }}>
        {children}
      </AppUserContext.Provider>
    );
}
