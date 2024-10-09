"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { loadStripe } from '@stripe/stripe-js'
import CommentSection from '@/components/CommentSection'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// ... (rest of the imports and creator object remain the same)

export default function CreatorProfilePage({ params }: { params: { id: string } }) {
  // ... (rest of the component logic remains the same)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (rest of the component structure remains the same) ... */}

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {creator.posts.map(post => (
            <Card key={post.id} className="mb-8">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter>
                <CommentSection postId={post.id} />
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About {creator.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{creator.bio}</p>
              {/* Add more details about the creator here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}