"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const creators = [
  { id: 1, name: 'Alice Johnson', category: 'Art & Illustration', avatar: 'https://source.unsplash.com/100x100/?portrait,woman', supporters: 1200 },
  { id: 2, name: 'Bob Smith', category: 'Music Production', avatar: 'https://source.unsplash.com/100x100/?portrait,man', supporters: 980 },
  { id: 3, name: 'Carol Davis', category: 'Game Development', avatar: 'https://source.unsplash.com/100x100/?portrait,woman', supporters: 1500 },
];

export default function FeaturedCreators() {
  const [supportedCreators, setSupportedCreators] = useState<number[]>([]);

  const handleSupport = (creatorId: number) => {
    setSupportedCreators((prev) => [...prev, creatorId]);
  };

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Featured Creators</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <Button
                onClick={() => handleSupport(creator.id)}
                disabled={supportedCreators.includes(creator.id)}
              >
                {supportedCreators.includes(creator.id) ? 'Supported' : 'Support'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}