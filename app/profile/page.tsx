'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import PersonalInfo from '../../components/personal-info'
import ProfileActions from '../../components/profile-actions'

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  })

  const updateProfile = (newData) => {
    setProfile(prev => ({ ...prev, ...newData }))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900">User Profile</CardTitle>
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