'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@auth0/nextjs-auth0/client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import axios from "axios";
import { useEffect, useState } from "react";

export interface Profile {
    firstName: string;
    lastName: string;
  }

export default function Register() {
    const { user, isLoading } = useUser();
    const [isUserInDatabase, setIsUserInDatabase] = useState(false);
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        if (user) {
            axios.get(`/api/ws/users/auth/${user.sub}`).then(response => {
                setIsUserInDatabase(response.data);
            }).catch(error => {
                setIsUserInDatabase(false);
            })
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (user) {
            axios.post(`/api/ws/users`, profile).then(response => {
                setIsUserInDatabase(true);
            }).catch(error => {
                console.error(error);
            })
        }
    }

    if(isUserInDatabase) {
        return (
            <div>You are already registered. Return to your dashboard.</div>
        )
    }

    return (
        <>
            <Card className="py-12 px-4 sm:px-6 lg:px-8 w-3/5 mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Register</CardTitle>
                    <p className="text-center">You must finish creating your account before continuing to the application.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                First Name:
                                <Input
                                    type="text"
                                    value={profile.firstName}
                                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Last Name:
                                <Input
                                    type="text"
                                    value={profile.lastName}
                                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                                    required
                                />
                            </label>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Register</Button>
                </CardFooter>
            </Card>
        </>
    )
}