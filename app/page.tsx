import FeaturedCreators from '@/components/FeaturedCreators';
import PopularCampaigns from '@/components/PopularCampaigns';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to CreatorSupport</h1>
      <FeaturedCreators />
      <PopularCampaigns />
      <HowItWorks />
    </div>
  );
}