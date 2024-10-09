"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { account, databases } from '@/lib/appwrite'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function CreatorDashboardPage() {
  const [user, setUser] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [content, setContent] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get()
        setUser(session)
        fetchCreatorData(session.$id)
      } catch (error) {
        router.push('/login')
      }
    }
    checkSession()
  }, [router])

  const fetchCreatorData = async (userId) => {
    try {
      const campaignsData = await databases.listDocuments('your-database-id', 'campaigns', [
        databases.equal('creator_id', userId)
      ])
      setCampaigns(campaignsData.documents)

      const contentData = await databases.listDocuments('your-database-id', 'content', [
        databases.equal('creator_id', userId)
      ])
      setContent(contentData.documents)

      // Fetch analytics data (this is a simplified example)
      const analyticsData = await databases.getDocument('your-database-id', 'analytics', userId)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error fetching creator data:', error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Creator Dashboard</h1>
      
      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Your Campaigns</CardTitle>
              <CardDescription>Manage your ongoing and past campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <p>You haven't created any campaigns yet.</p>
              ) : (
                <ul>
                  {campaigns.map((campaign) => (
                    <li key={campaign.$id}>{campaign.title}</li>
                  ))}
                </ul>
              )}
              <Button className="mt-4">Create New Campaign</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Your Content</CardTitle>
              <CardDescription>Manage your posts and exclusive content</CardDescription>
            </CardHeader>
            <CardContent>
              {content.length === 0 ? (
                <p>You haven't created any content yet.</p>
              ) : (
                <ul>
                  {content.map((item) => (
                    <li key={item.$id}>{item.title}</li>
                  ))}
                </ul>
              )}
              <Button className="mt-4">Create New Post</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View your performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {analytics ? (
                <div>
                  <p>Total Supporters: {analytics.total_supporters}</p>
                  <p>Total Earnings: ${analytics.total_earnings}</p>
                  <p>Average Contribution: ${analytics.average_contribution}</p>
                </div>
              ) : (
                <p>No analytics data available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}