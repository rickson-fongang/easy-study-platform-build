"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { TehillahWelcome } from "@/components/tehillah-welcome"
import { TehillahGuide } from "@/components/tehillah-guide"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  })

  const guidanceMessages = [
    "Great! Now please enter your full name.",
    "Perfect, now your email address.",
    "Create a strong password for your account.",
    "Please confirm your password to make sure it matches.",
    "Don't forget the special code from your tutor/admin—it's required to complete your registration.",
  ]

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }

    switch (name) {
      case "fullName":
        if (value.length < 2) {
          newErrors.fullName = "Name must be at least 2 characters"
        } else {
          delete newErrors.fullName
        }
        break
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address"
        } else {
          delete newErrors.email
        }
        break
      case "password":
        if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters"
        } else {
          delete newErrors.password
        }
        break
      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match"
        } else {
          delete newErrors.confirmPassword
        }
        break
      case "adminCode":
        if (value.length < 3) {
          newErrors.adminCode = "Please enter a valid admin code"
        } else {
          delete newErrors.adminCode
        }
        break
    }

    setErrors(newErrors)
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
    validateField(name, value)

    // Auto-advance to next step when field is completed
    const fieldOrder = ["fullName", "email", "password", "confirmPassword", "adminCode"]
    const currentFieldIndex = fieldOrder.indexOf(name)

    if (value && !errors[name] && currentFieldIndex === currentStep && currentStep < 4) {
      setTimeout(() => setCurrentStep(currentStep + 1), 500)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData])
    })

    if (Object.keys(errors).length > 0) {
      setIsLoading(false)
      return
    }

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      // TODO: Implement actual registration logic
      console.log("Registration successful:", formData)
      // Show success message from Tehillah and redirect
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      {showWelcome && (
        <TehillahWelcome onClose={() => setShowWelcome(false)} onStartRegistration={() => setShowWelcome(false)} />
      )}

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">EasyStudy</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">With Rickson Fongang</p>
        </div>

        {/* Tehillah Guidance */}
        <TehillahGuide
          message={guidanceMessages[currentStep] || "You're doing great! Fill out the remaining fields."}
          isVisible={!showWelcome && currentStep < 5}
        />

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join EasyStudy</CardTitle>
            <CardDescription>Create your account to start your learning journey with Tehillah</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center space-x-2">
                  <span>Full Name</span>
                  {formData.fullName && !errors.fullName && <CheckCircle className="h-4 w-4 text-primary" />}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={errors.fullName ? "border-destructive" : ""}
                  required
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <span>Email</span>
                  {formData.email && !errors.email && <CheckCircle className="h-4 w-4 text-primary" />}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                  required
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <span>Password</span>
                  {formData.password && !errors.password && <CheckCircle className="h-4 w-4 text-primary" />}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-destructive" : ""}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center space-x-2">
                  <span>Confirm Password</span>
                  {formData.confirmPassword && !errors.confirmPassword && (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={errors.confirmPassword ? "border-destructive" : ""}
                  required
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminCode" className="flex items-center space-x-2">
                  <span>Admin Code</span>
                  {formData.adminCode && !errors.adminCode && <CheckCircle className="h-4 w-4 text-primary" />}
                </Label>
                <Input
                  id="adminCode"
                  type="text"
                  placeholder="Enter the code provided by your tutor"
                  value={formData.adminCode}
                  onChange={(e) => handleInputChange("adminCode", e.target.value)}
                  className={errors.adminCode ? "border-destructive" : ""}
                  required
                />
                {errors.adminCode && <p className="text-sm text-destructive">{errors.adminCode}</p>}
                <p className="text-xs text-muted-foreground">You need a special code from your tutor to register</p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
