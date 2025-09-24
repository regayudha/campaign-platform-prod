'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/Button'
import { Input } from './ui/input'
import { CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        // Track signup event
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'signup',
            data: { email: formData.email }
          }),
        })
      } else {
        const error = await response.json()
        setErrors({ email: error.message || 'Something went wrong. Please try again.' })
      }
    } catch {
      setErrors({ email: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  if (isSuccess) {
    return (
      <section id="signup" className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Account created successfully
            </h3>
            <p className="text-gray-600 mb-8">
              Thanks for signing up! We&apos;ve sent a confirmation email to{' '}
              <span className="font-medium text-gray-900">{formData.email}</span>.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setIsSuccess(false)
                  setFormData({ name: '', email: '', phone: '' })
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sign up another person
              </Button>
              <div>
                <Link href="/" className="text-sm text-blue-600 hover:underline">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="signup" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join over 5,000 marketers already using our platform to grow their business.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Free to start</h3>
                  <p className="text-gray-600 text-sm">No credit card required. Cancel anytime.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Setup in minutes</h3>
                  <p className="text-gray-600 text-sm">Quick onboarding gets you running fast.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert support</h3>
                  <p className="text-gray-600 text-sm">Get help when you need it from real people.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Create your account
                </h3>
                <p className="text-gray-600">
                  Start your free trial today
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    className={`w-full h-11 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className={`w-full h-11 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    className={`w-full h-11 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Phone number (optional)"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  {isSubmitting ? 'Creating account...' : 'Get started free'}
                </Button>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
