'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PencilIcon, CheckIcon } from 'lucide-react'

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  updateProfile: (profile: { firstName: string; lastName: string }) => void;
}

export default function PersonalInfo({ firstName, lastName, updateProfile }: PersonalInfoProps) {
  const [editing, setEditing] = useState(false)
  const [tempFirstName, setTempFirstName] = useState(firstName)
  const [tempLastName, setTempLastName] = useState(lastName)

  const handleEdit = () => {
    if (editing) {
      updateProfile({ firstName: tempFirstName, lastName: tempLastName })
    }
    setEditing(!editing)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleEdit}
          aria-label={editing ? "Save name" : "Edit name"}
        >
          {editing ? <CheckIcon className="h-4 w-4" /> : <PencilIcon className="h-4 w-4" />}
        </Button>
      </div>
      {editing ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            value={tempFirstName}
            onChange={(e) => setTempFirstName(e.target.value)}
            placeholder="First Name"
            aria-label="First Name"
          />
          <Input
            value={tempLastName}
            onChange={(e) => setTempLastName(e.target.value)}
            placeholder="Last Name"
            aria-label="Last Name"
          />
        </div>
      ) : (
        <p>{firstName} {lastName}</p>
      )}
    </div>
  )
}