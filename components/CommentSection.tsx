"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { databases, account } from '@/lib/appwrite'

type Comment = {
  $id: string
  user_name: string
  content: string
  created_at: string
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await databases.listDocuments('your-database-id', 'comments', [
          databases.equal('post_id', postId),
          databases.orderDesc('$createdAt')
        ])
        setComments(response.documents)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    const getUser = async () => {
      try {
        const currentUser = await account.get()
        setUser(currentUser)
      } catch (error) {
        console.error('Error getting user:', error)
      }
    }

    fetchComments()
    getUser()
  }, [postId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('Please log in to comment')
      return
    }
    if (newComment.trim()) {
      try {
        const response = await databases.createDocument('your-database-id', 'comments', 'unique()', {
          post_id: postId,
          user_id: user.$id,
          user_name: user.name,
          content: newComment.trim(),
        })
        setComments([response, ...comments])
        setNewComment('')
      } catch (error) {
        console.error('Error creating comment:', error)
      }
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <form onSubmit={handleSubmitComment} className="mb-4">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="mb-2"
        />
        <Button type="submit">Post Comment</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.$id} className="flex items-start space-x-4">
            <Avatar>
              <AvatarFallback>{comment.user_name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{comment.user_name}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
</boltArtifact>

These implementations cover all the requested features using Appwrite instead of NextAuth.js and Stripe (except for the client-side Stripe integration for payments). Remember to replace 'your-database-id' with your actual Appwrite database ID and set up the necessary collections (users, contributions, exclusive_content, campaigns, content, analytics, notifications, comments) in your Appwrite console.

Also, don't forget to update the `Header` component to include the `NotificationCenter` for logged-in users:

<boltArtifact id="update-header" title="Update Header Component">
<boltAction type="file" filePath="components/Header.tsx">
"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import NotificationCenter from './NotificationCenter';
import { useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        setUser(session);
      } catch (error) {
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold mb-4 sm:mb-0">CreatorSupport</Link>
        <nav>
          <ul className="flex flex-wrap justify-center sm:justify-end space-x-4 items-center">
            <li><Link href="/explore" className="hover:text-primary">Explore</Link></li>
            <li><Link href="/start-creating" className="hover:text-primary">Start Creating</Link></li>
            {user && (
              <>
                <li><NotificationCenter /></li>
                <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              </>
            )}
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </Button>
            </li>
            <li>
              {user ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <Button asChild><Link href="/login">Login</Link></Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}