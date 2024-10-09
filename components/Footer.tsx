import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CreatorSupport</h3>
            <p className="text-sm text-muted-foreground">Empowering creators and their communities.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">For Creators</h4>
            <ul className="space-y-2">
              <li><Link href="/start-creating" className="text-sm hover:text-primary">Start Creating</Link></li>
              <li><Link href="/resources" className="text-sm hover:text-primary">Resources</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-primary">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">For Supporters</h4>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-sm hover:text-primary">Explore Creators</Link></li>
              <li><Link href="/how-it-works" className="text-sm hover:text-primary">How It Works</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary">Contact</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CreatorSupport. All rights reserved.
        </div>
      </div>
    </footer>
  );
}