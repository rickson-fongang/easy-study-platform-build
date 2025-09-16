import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, MessageCircle, Clock, Shield, Smartphone } from "lucide-react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 border-b border-border bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/videos/hero.mp4" // put video file in public/assets/videos
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Learn Smarter with <span className="text-primary">EasyStudy</span>
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            A comprehensive study platform that connects tutors and students with AI-powered assistance from Tehillah,
            your personal learning companion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link href="/register">
  <Button size="lg" className="w-full sm:w-auto neon-button">
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
            {[ 
              { icon: <BookOpen className="h-12 w-12 text-primary mb-4" />, title: "Video Tutorials", desc: "Access high-quality video content with time-limited access and progress tracking." },
              { icon: <Users className="h-12 w-12 text-primary mb-4" />, title: "Student Community", desc: "Connect and chat with fellow students to enhance your learning experience." },
              { icon: <MessageCircle className="h-12 w-12 text-primary mb-4" />, title: "AI Assistant - Tehillah", desc: "Get personalized guidance and support from your friendly AI learning companion." },
              { icon: <Clock className="h-12 w-12 text-primary mb-4" />, title: "Time Management", desc: "Built-in countdown timers and deadline tracking to keep you on schedule." },
              { icon: <Shield className="h-12 w-12 text-primary mb-4" />, title: "Secure Access", desc: "Admin-controlled registration with secure login system for all users." },
              { icon: <Smartphone className="h-12 w-12 text-primary mb-4" />, title: "Mobile Responsive", desc: "Learn anywhere, anytime with our fully responsive mobile design." }
            ].map((item, i) => (
              <Card
                key={i}
                className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <CardHeader>
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
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
      <footer className="border-t border-border bg-card py-10 px-4">
        <div className="container mx-auto text-center">
          <Image
            src="/assets/images/profile.jpg" // add your profile image in public/assets/images
            alt="Developer"
            width={100}
            height={100}
            className="mx-auto rounded-full mb-4 border-4 border-primary"
          />
          <h3 className="text-xl font-semibold">Developed by Rickson Fongang</h3>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://github.com/rickson-fongang" target="_blank" rel="noreferrer">
              <FaGithub className="text-2xl hover:text-primary transition" />
            </a>
            <a href="https://linkedin.com/in/your-link" target="_blank" rel="noreferrer">
              <FaLinkedin className="text-2xl hover:text-primary transition" />
            </a>
            <a href="https://twitter.com/your-handle" target="_blank" rel="noreferrer">
              <FaTwitter className="text-2xl hover:text-primary transition" />
            </a>
          </div>
          <p className="mt-6 text-muted-foreground">© {new Date().getFullYear()} EasyStudy with Rickson Fongang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
