import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const creators = [
  { id: 1, name: 'Alice Johnson', category: 'Art & Illustration', avatar: 'https://source.unsplash.com/100x100/?portrait,woman', supporters: 1200 },
  { id: 2, name: 'Bob Smith', category: 'Music Production', avatar: 'https://source.unsplash.com/100x100/?portrait,man', supporters: 980 },
  { id: 3, name: 'Carol Davis', category: 'Game Development', avatar: 'https://source.unsplash.com/100x100/?portrait,woman', supporters: 1500 },
  { id: 4, name: 'David Brown', category: 'Photography', avatar: 'https://source.unsplash.com/100x100/?portrait,man', supporters: 750 },
  { id: 5, name: 'Eva White', category: 'Writing', avatar: 'https://source.unsplash.com/100x100/?portrait,woman', supporters: 2200 },
  { id: 6, name: 'Frank Green', category: 'Podcasting', avatar: 'https://source.unsplash.com/100x100/?portrait,man', supporters: 1800 },
];

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Explore Creators</h1>
      
      <div className="flex mb-8">
        <Input className="mr-2" placeholder="Search creators..." />
        <Button>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <Card key={creator.id}>
            <CardHeader>
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle>{creator.name}</CardTitle>
              <CardDescription>{creator.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center">{creator.supporters} supporters</p>
            </CardContent>
            <CardFooter className="justify-center">
              <Button asChild>
                <Link href={`/creator/${creator.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}