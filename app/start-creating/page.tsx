import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    title: "Customizable Profile",
    description: "Create a unique profile that showcases your work and personality."
  },
  {
    title: "Multiple Support Options",
    description: "Offer one-time donations, subscriptions, or tiered support levels."
  },
  {
    title: "Exclusive Content",
    description: "Share special content with your most dedicated supporters."
  },
  {
    title: "Community Engagement",
    description: "Interact with your supporters through comments and updates."
  },
  {
    title: "Analytics Dashboard",
    description: "Track your growth and understand your audience better."
  },
  {
    title: "Payout Options",
    description: "Choose how and when you want to receive your earnings."
  }
]

export default function StartCreatingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Start Creating</h1>
      
      <div className="max-w-2xl mx-auto mb-12">
        <p className="text-lg mb-4">
          Join our platform and turn your passion into a sustainable career. Connect with supporters who believe in your work and want to help you succeed.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">Create Your Creator Account</Link>
        </Button>
      </div>

      <h2 className="text-3xl font-bold mb-6">Why Choose CreatorSupport?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}