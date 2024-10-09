"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const campaigns = [
  { id: 1, title: 'New Art Studio Equipment', creator: 'Alice Johnson', goal: 5000, current: 3750 },
  { id: 2, title: 'Album Recording Fund', creator: 'Bob Smith', goal: 10000, current: 7500 },
  { id: 3, title: 'Indie Game Development', creator: 'Carol Davis', goal: 15000, current: 9000 },
];

export default function PopularCampaigns() {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Popular Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription>by {campaign.creator}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(campaign.current / campaign.goal) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                ${campaign.current} raised of ${campaign.goal} goal
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Support This Campaign</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}