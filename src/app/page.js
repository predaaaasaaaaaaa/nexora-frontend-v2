import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Calendar, Lightbulb, Star } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">NEXORA</span>
              <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full font-semibold">BETA</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Social Media Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI Coach for
            <span className="text-primary-600"> Social Media Success</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            NEXORA is an AI-tool that helps Creators/Managers to grow faster & smarter 
            while focusing on productivity and without burning out!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Try Beta Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#features" className="btn-secondary text-lg px-8 py-4">
              See How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary-600">4</div>
              <div className="text-sm text-gray-600 mt-1">Platforms Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">AI</div>
              <div className="text-sm text-gray-600 mt-1">Powered Intelligence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Smart Coaching</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Dominate Social Media
            </h2>
            <p className="text-xl text-gray-600">
              One intelligent AI that powers all your social media decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unified Analytics
              </h3>
              <p className="text-gray-600">
                See all your metrics from Instagram, YouTube, TikTok, and Twitter in one dashboard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Coach
              </h3>
              <p className="text-gray-600">
                Get personalized advice that learns from your content and adapts to your goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Scheduler
              </h3>
              <p className="text-gray-600">
                AI predicts the optimal times to post based on your audience behavior.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Content Ideas
              </h3>
              <p className="text-gray-600">
                Generate viral content ideas based on what works for your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
              Beta Program
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Early Users Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real feedback from creators who are already using NEXORA in beta
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 - Sarah Martinez */}
            <div className="card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Sarah+Martinez&background=7c3aed&color=fff&size=64&rounded=true"
                  alt="Sarah Martinez"
                  className="w-16 h-16 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    "The AI coach is a game-changer!"
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                I've been struggling with what to post on Instagram for weeks. NEXORA's AI coach literally feels like having a social media expert in my pocket. Yeah, it's still in beta and some features are coming soon, but the coach alone has saved me hours of brainstorming. Can't wait to see the analytics when they connect the APIs!
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">Sarah Martinez</p>
                <p className="text-sm text-gray-600">Freelance Photographer</p>
              </div>
            </div>

            {/* Testimonial 2 - James Chen */}
            <div className="card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=James+Chen&background=8b5cf6&color=fff&size=64&rounded=true"
                  alt="James Chen"
                  className="w-16 h-16 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    "Finally, no more creative block"
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                As a small business owner, I don't have time to think about content 24/7. The idea generator gives me platform-specific suggestions in seconds. Some are okay, some are brilliant—but it gets my creative juices flowing. Super excited for the full release!
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">James Chen</p>
                <p className="text-sm text-gray-600">Coffee Shop Owner</p>
              </div>
            </div>

            {/* Testimonial 3 - Aisha Patel */}
            <div className="card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Aisha+Patel&background=a78bfa&color=fff&size=64&rounded=true"
                  alt="Aisha Patel"
                  className="w-16 h-16 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    "Planning content has never been easier"
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                I love that I can schedule posts across different platforms in one place. Sure, it's in beta and I'm still waiting for the real-time analytics, but honestly? The scheduling feature alone makes it worth using. The team is clearly building something special here.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">Aisha Patel</p>
                <p className="text-sm text-gray-600">Lifestyle Blogger</p>
              </div>
            </div>

            {/* Testimonial 4 - Marcus Johnson */}
            <div className="card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Marcus+Johnson&background=6d28d9&color=fff&size=64&rounded=true"
                  alt="Marcus Johnson"
                  className="w-16 h-16 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    "Best content tool I've tried this year"
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                I signed up for the beta not expecting much, but wow. The AI coach understands my niche, the idea generator actually gives useful suggestions, and I can plan my whole week in like 20 minutes. Analytics dashboard is coming soon but I'm not worried—everything else works great. 10/10 would recommend trying the beta!
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">Marcus Johnson</p>
                <p className="text-sm text-gray-600">Fitness Coach</p>
              </div>
            </div>

            {/* Testimonial 5 - Elena Rodriguez */}
            <div className="card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Elena+Rodriguez&background=c4b5fd&color=000&size=64&rounded=true"
                  alt="Elena Rodriguez"
                  className="w-16 h-16 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    "Rough around the edges, but SO promising"
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Let me be real: it's a beta, so not everything is live yet. BUT the features that work? They're fantastic. The AI coach has helped me craft better captions, and the content ideas are surprisingly good. I'm genuinely excited to see what this becomes when they add the analytics. Early adopter vibes! 🚀
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">Elena Rodriguez</p>
                <p className="text-sm text-gray-600">Digital Nomad & Content Creator</p>
              </div>
            </div>

            {/* Testimonial 6 - Tom Williams */}
            <div className="card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Tom+Williams&background=5b21b6&color=fff&size=64&rounded=true"
                  alt="Tom Williams"
                  className="w-16 h-16 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    "Saved me 3 hours last week"
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Used the idea generator before a big campaign and got 15 solid concepts in minutes. That alone paid for... wait, it's free in beta? 😂 Seriously though, great tool even in early stages.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">Tom Williams</p>
                <p className="text-sm text-gray-600">Marketing Consultant</p>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Join 500+ early adopters</span> shaping the future of AI-powered social media management
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join creators who are already using AI to grow smarter, not harder.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Try Beta Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary-400" />
                <span className="text-xl font-bold text-white">NEXORA</span>
              </div>
              <p className="text-sm">
                © 2025 NEXORA. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
