"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { account, databases } from '@/lib/appwrite'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [contributions, setContributions] = useState([])
  const [exclusiveContent, setExclusiveContent] = useState([])
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get()
        setUser(session)
        fetchUserData(session.$id)
      } catch (error) {
        router.push('/login')
      }
    }
    checkSession()
  }, [router])

  const fetchUserData = async (userId) => {
    try {
      const contributionsData = await databases.listDocuments('your-database-id', 'contributions', [
        databases.equal('user_id', userId)
      ])
      setContributions(contributionsData.documents)

      const contentData = await databases.listDocuments('your-database-id', 'exclusive_content', [
        databases.equal('access', userId)
      ])
      setExclusiveContent(contentData.documents)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}</h1>
      
      <Tabs defaultValue="contributions">
        <TabsList>
          <TabsTrigger value="contributions">My Contributions</TabsTrigger>
          <TabsTrigger value="content">Exclusive Content</TabsTrigger>
        </TabsList>
        <TabsContent value="contributions">
          <Card>
            <CardHeader>
              <CardTitle>Your Contributions</CardTitle>
              <CardDescription>A summary of your support to creators</CardDescription>
            </CardHeader>
            <CardContent>
              {contributions.length === 0 ? (
                <p>You haven't made any contributions yet.</p>
              ) : (
                <ul>
                  {contributions.map((contribution) => (
                    <li key={contribution.$id}>{contribution.amount} to {contribution.creator_name}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Exclusive Content</CardTitle>
              <CardDescription>Special content from creators you support</CardDescription>
            </CardHeader>
            <CardContent>
              {exclusiveContent.length === 0 ? (
                <p>No exclusive content available yet.</p>
              ) : (
                <ul>
                  {exclusiveContent.map((content) => (
                    <li key={content.$id}>{content.title}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}