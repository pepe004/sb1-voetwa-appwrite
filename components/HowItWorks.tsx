import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartIcon, UserIcon, GiftIcon } from 'lucide-react';

const steps = [
  {
    icon: <UserIcon className="w-12 h-12 text-primary" />,
    title: 'Create Your Profile',
    description: 'Sign up and customize your creator profile to showcase your work and connect with supporters.',
  },
  {
    icon: <HeartIcon className="w-12 h-12 text-primary" />,
    title: 'Receive Support',
    description: 'Your fans can support you through one-time donations or recurring subscriptions.',
  },
  {
    icon: <GiftIcon className="w-12 h-12 text-primary" />,
    title: 'Offer Rewards',
    description: 'Create exclusive content and perks for your supporters to show your appreciation.',
  },
];

export default function HowItWorks() {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">{step.icon}</div>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}