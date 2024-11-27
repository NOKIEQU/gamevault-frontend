'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Save, Upload } from 'lucide-react'

export default function EditProfile() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    avatar: '/placeholder.svg?height=100&width=100',
    bio: 'Passionate gamer and tech enthusiast.',
    password: '',
    confirmPassword: '',
    newsletter: true,
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    language: 'english',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSwitchChange = (name) => {
    setUser(prevUser => ({
      ...prevUser,
      [name]: !prevUser[name]
    }))
  }

  const handleNotificationChange = (type) => {
    setUser(prevUser => ({
      ...prevUser,
      notifications: {
        ...prevUser.notifications,
        [type]: !prevUser.notifications[type]
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement update logic here
    console.log('Updating user profile:', user)
    router.push('/profile')
  }

  return (
    <div className="w-full h-full px-5 md:px-20 lg:px-40 2xl:px-60 overflow-hidden">
      <Button variant="ghost" className="mb-4" onClick={() => router.push('/profile')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Avatar
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={user.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <Separator />
            </div>
            <CardFooter className="flex justify-end mt-6">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}