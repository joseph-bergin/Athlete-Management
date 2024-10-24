'use client'

import { useState, useEffect, useContext } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import PersonalInfo from '../../components/personal-info'
import ProfileActions from '../../components/profile-actions'
import { AppUserContext } from '@/providers/app-user.provider'

export interface Profile {
  firstName: string;
  lastName: string;
}

export default function Profile() {
  const { user, error, isLoading } = useUser()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    if (user && user.sub) {
      
      fetch(`/api/ws/users/${user.sub}`)
        .then(response => response.json())
        .then(data => setProfile(data))
        .catch(err => console.error(err))
    }
  }, [user])
  const updateProfile = (newData: Profile) => {
    if (profile && user?.sub) {
      setProfile(prev => ({ ...prev, ...newData }))

      fetch(`/api/ws/user/auth`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authId: user.sub,
          ...newData
        })
      })
        .then(response => response.json())
        .then(updatedProfile => {
          setProfile(updatedProfile)
        })
        .catch(err => console.error("Error updating profile", err))
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  if (!profile) {
    return <div>Loading profile...</div>
  }



  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="mt-6 space-y-8">
          <PersonalInfo 
            firstName={profile.firstName} 
            lastName={profile.lastName} 
            updateProfile={updateProfile}
          />
        </CardContent>
        <CardFooter>
          <ProfileActions />
        </CardFooter>
      </Card>
    </div>
  )
}