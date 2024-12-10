'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppUserContext } from './app-user.provider';

export interface Team {
    teamID: number;
    teamOwnerID: number;
    teamName: string;
}

export interface TeamContext {
    selectedTeam: Team | undefined;
    teams: Team[];
    selectTeam: (team: Team) => void;
    getTeams: () => void;
}

export const TeamContext = createContext({
    selectedTeam: undefined,
    teams: [],
    selectTeam: (team: Team) => {},
    getTeams: () => {},
} as TeamContext);

export function TeamProvider({ children }: { children: ReactNode }) {
    const { appUser } = useContext(AppUserContext);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, selectTeam] = useState<Team>();

    const getTeams = () => {
        if(appUser) {
            axios.get(`/api/ws/teams/owner/${appUser.userID}`).then(response => {
                setTeams(response.data);
            }).catch(() => {
                setTeams([]);
            });
        }
    };

    useEffect(() => {
        if(appUser) {
            getTeams();

            let storedTeam = localStorage.getItem('selectedTeam');
            if(storedTeam) {
                selectTeam(JSON.parse(storedTeam));
            }
        }
    }, [appUser]);

    useEffect(() => {
        if(selectedTeam) {
            localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));
        }
    }, [selectedTeam]);
  
    return (
      <TeamContext.Provider value={{
        selectedTeam,
        selectTeam,
        teams,
        getTeams
      }}>
        {children}
      </TeamContext.Provider>
    );
}