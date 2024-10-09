"use client"

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { databases, account } from '@/lib/appwrite'

type Notification = {
  $id: string
  message: string
  created_at: string
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = await account.get()
        const response = await databases.listDocuments('your-database-id', 'notifications', [
          databases.equal('user_id', user.$id),
          databases.orderDesc('$createdAt')
        ])
        setNotifications(response.documents)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <CardDescription>No new notifications</CardDescription>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.$id}>
                <div>
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-500">{new Date(notification.created_at).toLocaleString()}</p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </CardContent>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}