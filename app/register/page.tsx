'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface Profile {
    firstName: string;
    lastName: string;
    authId: string;
}

export default function Register() {

    const { user, isLoading } = useUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();
    
    if (!user) {
        return null;
    }

    function saveUser(firstName: string, lastName: string, user: UserProfile) {
        if (!user.sub) {
            console.error('User sub not found');
            return;
        }

        const profile: Profile = {
            firstName,
            lastName,
            authId: user.sub
        }

        axios.post('/api/ws/users', profile).then(response => {
            console.log('User registered successfully:', response.data);
            router.push('/dashboard');
        }).catch(error => {
            console.error('Error registering user:', error);
        });
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (user) {
            saveUser(firstName, lastName, user);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Card className="py-12 px-4 sm:px-6 lg:px-8 w-3/5 mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">Register</CardTitle>
                        <p className="text-center">You must finish creating your account before continuing to the application.</p>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                First Name
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Last Name
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Register</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}