import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, MessageCircle, Clock, Shield, Smartphone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">EasyStudy</h1>
              <span className="text-sm text-muted-foreground">With Rickson Fongang</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Learn Smarter with <span className="text-primary">EasyStudy</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            A comprehensive study platform that connects tutors and students with AI-powered assistance from Tehillah,
            your personal learning companion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Learning Today
              </Button>
            </Link>
            <Link href="/tutor-login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                I'm a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Everything You Need to Succeed</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Access high-quality video content with time-limited access and progress tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Student Community</CardTitle>
                <CardDescription>
                  Connect and chat with fellow students to enhance your learning experience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI Assistant - Tehillah</CardTitle>
                <CardDescription>
                  Get personalized guidance and support from your friendly AI learning companion.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Time Management</CardTitle>
                <CardDescription>
                  Built-in countdown timers and deadline tracking to keep you on schedule.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Secure Access</CardTitle>
                <CardDescription>Admin-controlled registration with secure login system for all users.</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Mobile Responsive</CardTitle>
                <CardDescription>Learn anywhere, anytime with our fully responsive mobile design.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">Ready to Transform Your Learning?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join students already learning with EasyStudy and experience the difference.
          </p>
          <Link href="/register">
            <Button size="lg">Get Started Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">EasyStudy</span>
          </div>
          <p className="text-muted-foreground">© 2025 EasyStudy with Rickson Fongang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
