import { Brush, Palette, Share2} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Create, Draw, Share
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Express your creativity with our intuitive drawing tool. Create beautiful artwork, diagrams, and sketches with ease.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="text-lg px-8">
              Start Drawing
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Gallery
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <Brush className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Intuitive Tools</h3>
            <p className="text-gray-600">
              Professional-grade drawing tools that are easy to use. Perfect for both beginners and experts.
            </p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <Palette className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rich Features</h3>
            <p className="text-gray-600">
              Extensive color palettes, brush styles, and customization options to bring your vision to life.
            </p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <Share2 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-600">
              Share your artwork instantly with friends and colleagues, or export in multiple formats.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white/40 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of artists and creators who use Canvas daily for their creative projects.
          </p>
          <Button size="lg" className="text-lg px-8">
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}